import { Router } from "express";
import { getCatwayReservations, getCatwayReservationByID, createNewCatwayReservation } from "../services/catwayReservations.js";

const router = Router({ mergeParams: true });

router.get("/", getCatwayReservations);
router.get("/:idReservation", getCatwayReservationByID);
router.post("/", createNewCatwayReservation);

export default router;