import { config } from "dotenv";
import express from "express";
import morgan from "morgan";
import router from "./routes/routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

// dotenv
config();
const { CORS_ORIGIN } = process.env;

// app
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization", "Token"],
    credentials: true,
    exposedHeaders: ["Token"],
  })
);
app.use(cookieParser());
// routes
app.use("/", router);
app.get("/", (req, res) => {
  res.send("Not authorized!");
});

export default app;
