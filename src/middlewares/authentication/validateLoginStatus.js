// 3rd Party Modules
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Local imports
import ControllerResponse from "../../utils/mvcClasses/ControllerResponse.js";
import sequelize from "../../database.js";
import response from "../../utils/functions/response.js";

// Load environment variables
dotenv.config();

// Get JWT_SECRET from environment variables
const { JWT_SECRET } = process.env;

// models
const { TokensBlacklist } = sequelize.models;

// Validate login status
export default async function validateLoginStatus(req, res, next) {
  try {
    //obtain action from header

    // obtain token from header
    const token = req.headers?.authorization?.split(" ")[1] ?? null;

    // verify if token exists
    if (!token) {
      const result = ControllerResponse.notAuthorized(
        "Falta el token de autenticación",
        null,
        false
      );
      return response(res, result.status, result.message, result.error, false);
    }

    // verify if token is valid
    const tokenData = jwt.verify(token, JWT_SECRET);

    // if !tokenData, token is invalid
    if (!tokenData) {
      const result = ControllerResponse.badRequest(
        "Token inválido",
        null,
        false
      );
      return response(
        res,
        result.status,
        result.message,
        result.error,
        result.data,
        result.done
      );
    }

    // comprobar la existencia del usuario
    if (!tokenData.id) {
      const result = ControllerResponse.badRequest(
        "Token inválido",
        null,
        false
      );
      return response(
        res,
        result.status,
        result.message,
        result.error,
        result.data,
        result.done
      );
    }

    const userExists = await sequelize.models?.Users.count({
      where: {
        id: tokenData?.id,
      },
    });

    if (!userExists) {
      const result = ControllerResponse.notFound(
        "El usuario no existe",
        null,
        false
      );
      return response(
        res,
        result.status,
        result.message,
        result.error,
        result.data,
        result.done
      );
    }

    // check if token is blacklisted
    const tokenBlacklisted = await TokensBlacklist.findOne({
      where: {
        token,
      },
    });

    // if token is blacklisted, token is invalid
    if (tokenBlacklisted) {
      const result = ControllerResponse.notAuthorized(
        "Iniciá sesión para continuar",
        null,
        false
      );
      return response(
        res,
        result.status,
        result.message,
        result.error,
        result.data,
        result.done
      );
    }

    // set user data to request object
    req.loggedIn = true;

    // call next middleware
    return next();
  } catch (error) {
    // if the error is a jwt.TokenExpiredError, token is expired
    if (error instanceof jwt.TokenExpiredError) {
      const result = ControllerResponse.notAuthorized(
        "Inicia sesión para continuar",
        null,
        false
      );
      return response(
        res,
        result.status,
        result.message,
        result.error,
        result.data,
        result.done
      );
    }

    // if the error is a jwt.JsonWebTokenError, token is invalid
    if (error instanceof jwt.JsonWebTokenError) {
      const result = ControllerResponse.notAuthorized(
        "Token inválido",
        null,
        false
      );
      return response(
        res,
        result.status,
        result.message,
        result.error,
        result.data,
        result.done
      );
    } else {
      // if the error is not a jwt.TokenExpiredError or jwt.JsonWebTokenError, return the error
      console.log(error);
      const result = ControllerResponse.error(
        "Error al validar el token",
        error,
        false
      );
      return response(
        res,
        result.status,
        result.message,
        result.error,
        result.data,
        result.done
      );
    }
  }
}

export function checkNOTLoggedIn(req, res, next) {
  try {
    // check if user is logged in
    const isLoggedIn = req.loggedIn;

    // if user is logged in, return error
    if (isLoggedIn) {
      const { message, status, error, data, done } =
        ControllerResponse.badRequest("Ya iniciaste sesión");
      return response(res, status, message, error, data, done);
    }

    // call next middleware
    return next();
  } catch (error) {
    console.error(error);
  }
}
