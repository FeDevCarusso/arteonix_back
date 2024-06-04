import { Router } from "express";
import { registerHandler } from "../handlers/auth/authHandler.js";
import { authSchema } from "../utils/validators/validations.js";
import validatorMiddleware from "../middlewares/validatorMiddleare.js";

const authRouter = Router()

authRouter.post("/", (req, res, next) => validatorMiddleware(authSchema, req, res, next), registerHandler)

export default authRouter