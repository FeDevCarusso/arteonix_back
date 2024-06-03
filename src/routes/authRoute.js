import { Router } from "express";
import { registerHandler } from "../handlers/auth/authHandler.js";

const authRouter = Router()

authRouter.post("/", registerHandler)

export default authRouter