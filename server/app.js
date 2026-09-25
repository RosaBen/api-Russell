import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";

import indexRouter from "./routes/index.js";
import userRouter from "./routes/users.js";
import { initClientDbConnection } from "./db/mongo.js";

initClientDbConnection();

const app = express();

// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true
// }));

app.use(cors({
  exposedHeaders: ["Authorization"],
  origin: "*"
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", indexRouter);
app.use("/api/users", userRouter);


app.use(function (req, res, next) {
  res.status(404).json({
    name: "server",
    version: "1.0.0",
    status: 404,
    message: "not Found"
  });
});


export default app;
