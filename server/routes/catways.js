import { Router } from "express";
import { protect } from "../middleware/auth.js";
import { createNewCatway, getAllCatways, getCatwayByNumber, editCatway, deleteCatway, } from "../services/catways.js";

const router = Router();

router.post("/", protect, createNewCatway);
router.get("/", protect, getAllCatways);
router.get("/:id", protect, getCatwayByNumber);
router.put("/:id", protect, editCatway);
router.delete("/:id", protect, deleteCatway);


export default router;