import { Router } from "express";
import { getCatwayReservations } from "../services/reservations.js";

const router = Router({ mergeParams: true });

router.get("/", getCatwayReservations);

export default router;