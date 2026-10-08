import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";

import indexRouter from "./routes/index.js";
import userRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";
import catwayRouter from "./routes/catways.js";
import reservationRouter from "./routes/reservations.js";
import catwayReservationRouter from "./routes/catwayReservations.js";
import { initClientDbConnection } from "./db/mongo.js";


initClientDbConnection();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  // origin: "http://localhost:4173",
  credentials: true
}));

// app.use(cors({
//   exposedHeaders: ["Authorization"],
//   origin: "*"
// }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", indexRouter);
app.use("/api/users", userRouter);
app.use("/api", authRouter);
app.use("/api/catways", catwayRouter);
app.use("/api/reservations", reservationRouter);
app.use("/api/catways/:id/reservations", catwayReservationRouter);


app.use(function (req, res, next) {
  res.status(404).json({
    name: "server",
    version: "1.0.0",
    status: 404,
    message: "not Found"
  });
});


export default app;
