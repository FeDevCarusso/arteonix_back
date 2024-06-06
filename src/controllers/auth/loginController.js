// 3rd party imports
import bcrypt from "bcrypt";
import { Op } from "sequelize";

// local imports

import sequelize from "../../database.js";
import ControllerResponse from "../../utils/mvcClasses/ControllerResponse.js";
import generateToken from "../../utils/functions/jwt.js";

// models
const { Users } = sequelize.models;

// login controller
async function loginController(userData) {
  try {
    // obtain user data
    const { username, password } = userData;

    // find user
    const user = await Users.findOne({
      where: {
        [Op.or]: [
          {
            username: { [Op.iLike]: `%${username}%` },
          },
          {
            email: { [Op.iLike]: `%${username}%` },
          },
        ],
      },
    });

    // validate user
    if (!user) {
      return ControllerResponse.notFound(
        "El usuario solicitado no existe",
        null,
        false
      );
    }

    // validate password
    const isValidPw = await bcrypt.compare(password, user.password);

    // if password is not valid
    if (!isValidPw) {
      return ControllerResponse.notAuthorized(
        "La contraseña es incorrecta",
        null,
        true
      );
    }

    // generate token
    const token = generateToken({ id: user.id, username: user.username });

    // return success response
    return ControllerResponse.success(
      "Inicio de sesión exitoso",
      { token },
      true
    );
  } catch (error) {
    console.log("Error al iniciar sesión");
    console.error(error);
    return ControllerResponse.error("Error al iniciar sesión", error, false);
  }
}

export { loginController };
