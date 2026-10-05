import { Router } from "express";
import { getCatwayReservations, getCatwayReservationByID, createNewCatwayReservation, editExistingReservation } from "../services/catwayReservations.js";

const router = Router({ mergeParams: true });

router.get("/", getCatwayReservations);
router.get("/:idReservation", getCatwayReservationByID);
router.post("/", createNewCatwayReservation);
router.put("/:idReservation", editExistingReservation);

export default router;