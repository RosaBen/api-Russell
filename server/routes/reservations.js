import { Router } from "express";
import { getAllReservations } from "../services/reservations.js";

const router = Router();

router.get("/", getAllReservations);

export default router;