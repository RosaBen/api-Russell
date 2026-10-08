import { Router } from "express";
import { protect } from "../middleware/auth.js";
import { getCatwayReservations, getCatwayReservationByID, createNewCatwayReservation, editExistingReservation, deleteCatwayReservation } from "../services/catwayReservations.js";

const router = Router({ mergeParams: true });

router.get("/", protect, getCatwayReservations);
router.get("/:idReservation", protect, getCatwayReservationByID);
router.post("/", protect, createNewCatwayReservation);
router.put("/:idReservation", protect, editExistingReservation);
router.delete("/:idReservation", protect, deleteCatwayReservation);

export default router;