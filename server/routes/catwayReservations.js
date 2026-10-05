import { Router } from "express";
import { getCatwayReservations, getCatwayReservationByID, createNewCatwayReservation, editExistingReservation, deleteCatwayReservation } from "../services/catwayReservations.js";

const router = Router({ mergeParams: true });

router.get("/", getCatwayReservations);
router.get("/:idReservation", getCatwayReservationByID);
router.post("/", createNewCatwayReservation);
router.put("/:idReservation", editExistingReservation);
router.delete("/:idReservation", deleteCatwayReservation);

export default router;