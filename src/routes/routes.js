import { Router } from "express";
import authRouter from "./authRoute.js";

const router = Router();

router.use("/authentication", authRouter)

export default router;