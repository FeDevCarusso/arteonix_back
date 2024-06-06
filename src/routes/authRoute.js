// 3rd party imports
import { Router } from "express";

// local imports

import validatorMiddleware from "../middlewares/validatorMiddleare.js";
import { loginHandler } from "../handlers/auth/loginHandler.js";
import { registerHandler } from "../handlers/auth/registerHandler.js";
import {
  loginSchema,
  registerSchema,
} from "../utils/validators/validations.js";
import logoutHandler from "../handlers/auth/logoutHandler.js";
import validateLoginStatus, {
  checkNOTLoggedIn,
} from "../middlewares/authentication/validateLoginStatus.js";
import verifyAccountHandler from "../handlers/auth/verifyAccountHandler.js";
import response from "../utils/functions/response.js";
import loginStatusHandler from "../handlers/auth/loginStatusHandler.js";

// router
const authRouter = Router();

// routes

// register
authRouter.post(
  "/register",
  (req, res, next) => validatorMiddleware(registerSchema, req, res, next),
  registerHandler
);

//login
authRouter.post(
  "/login",
  (req, res, next) => validatorMiddleware(loginSchema, req, res, next),
  loginHandler
);

// logout
authRouter.get("/logout", validateLoginStatus, logoutHandler);

// get login status
authRouter.get("/login_status", validateLoginStatus, loginStatusHandler);

// error si no se pasa el token
authRouter.get("/verify", (req, res) => {
  return response(res, 400, "Enlace de verificación no válido");
});

// verify acc
authRouter.get("/verify/:token", verifyAccountHandler);

// export
export default authRouter;
