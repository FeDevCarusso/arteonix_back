// 3rd party imports

import { Op } from "sequelize";
import bcrypt from "bcrypt";
import crypto from "node:crypto";
// local imports

import sequelize from "../../database.js";
import ControllerResponse from "../../utils/mvcClasses/ControllerResponse.js";
import { sendMail } from "../../config/nodemailer.js";

// models
const { Users, UserProfile, ConfirmationTokens } = sequelize.models;

// register controller
async function registerController(userData) {
  // create a transaction to ensure consistency
  const transaction = await sequelize.transaction();

  try {
    // get the data from the request body
    const { username, password, email, role } = userData;
    const hashedPw = await bcrypt.hash(password, 10);

    // check if the username or email already exists
    const [user, isNew] = await Users.findOrCreate({
      where: {
        [Op.or]: [{ username: username }, { email: email }],
      },
      // include the UserProfile model in the join
      defaults: {
        username: username,
        email: email,
        password: hashedPw,
        role: role,
      },
      transaction,
    });

    // check if the user was created successfully
    if (isNew && !user) {
      console.error("error while registering user");
      return ControllerResponse.error(
        "Error al registrar el usuario",
        null,
        false
      );
    }

    // check if the user already has a profile
    if (!isNew) {
      return ControllerResponse.conflict("El usuario ya existe", null, true);
    }

    const generatedVerifyToken = crypto.randomBytes(13).toString("hex");
    const verifyTokenExpiry = new Date(Date.now() + 3600000); // 1 hour
    const [savedToken, isNewToken] = await ConfirmationTokens.findOrCreate({
      where: {
        token: generatedVerifyToken,
      },
      defaults: {
        token: generatedVerifyToken,
        expiresAt: verifyTokenExpiry,
        userId: user.id,
      },
      transaction,
    });

    if (!isNewToken) {
      console.error("error while creating token");
      return ControllerResponse.error(
        "Error al registrar el usuario",
        null,
        true
      );
    }

    //relate created models
    await user.setConfirmationTokens(savedToken);

    // send verification email
    await sendMail(email, username, savedToken.token);

    // create a new UserProfile instance
    await transaction.commit();
    //dev TODO
    console.log(generatedVerifyToken);
    // return a success response
    return ControllerResponse.success("¡Registro exitoso!", null, true);

    // catch any errors that may occur during the transaction
  } catch (error) {
    // rollback the transaction if an error occurs
    await transaction.rollback();

    // log the error
    console.log("Error registering an user:");

    // return an error response
    console.error(error);

    return ControllerResponse.error(
      "Error al registrar el usuario",
      null,
      true
    );
  }
}

export { registerController };
