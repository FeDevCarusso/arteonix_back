import { config } from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import router from './routes/routes.js';

// dotenv
config();

// app
const app = express();


// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// routes
app.use("/", router)
app.get("/", (req, res) => {
    res.send("Not authorized!");
})

export default app;
