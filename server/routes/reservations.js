import { Router } from "express";
import { getAllReservations, getReservationById } from "../services/reservations.js";

const router = Router();

router.get("/", getAllReservations);
router.get("/:id", getReservationById);


export default router;