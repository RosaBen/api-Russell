import { Router } from "express";
import { protect } from "../middleware/auth.js";
import { getAllReservations, getReservationById } from "../services/reservations.js";

const router = Router();

router.get("/", protect, getAllReservations);
router.get("/:id", protect, getReservationById);


export default router;