import { Router } from "express";
import { getCatwayReservations, getCatwayReservationByID } from "../services/catwayReservations.js";

const router = Router({ mergeParams: true });

router.get("/", getCatwayReservations);
router.get("/:idReservation", getCatwayReservationByID);

export default router;