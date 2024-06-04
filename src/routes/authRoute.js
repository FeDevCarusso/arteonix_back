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
import validateLoginStatus from "../middlewares/authentication/validateLoginStatus.js";

// router
const authRouter = Router();

// routes
authRouter.post(
  "/register",
  (req, res, next) => validatorMiddleware(registerSchema, req, res, next),
  registerHandler
);
authRouter.post(
  "/login",
  (req, res, next) => validatorMiddleware(loginSchema, req, res, next),
  loginHandler
);
authRouter.get("/logout", validateLoginStatus, logoutHandler);

// export
export default authRouter;
