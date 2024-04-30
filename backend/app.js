import express from "express";
import dotenv from 'dotenv';
import cors from "cors";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes.js";
import applicationRouter from "./routes/applicationRoutes.js";
import jobRouter from "./routes/jobRoutes.js";
import { dbConnection } from "./database/dbConnection.js";
import { config } from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";

const app = express();
config({ path: "./config/config.env" });
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    method: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);
dbConnection();

app.use(errorMiddleware);
export default app;
