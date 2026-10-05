import { Router } from "express";
import { createNewCatway, getAllCatways, getCatwayByNumber, editCatway, deleteCatway, getAllReservations } from "../services/catways.js";

const router = Router();

router.post("/", createNewCatway);
router.get("/", getAllCatways);
router.get("/reservations", getAllReservations);
router.get("/:id", getCatwayByNumber);
router.put("/:id", editCatway);
router.delete("/:id", deleteCatway);


export default router;