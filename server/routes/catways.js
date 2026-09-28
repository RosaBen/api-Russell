import { Router } from "express";
import { createNewCatway, getAllCatways, getCatwayByNumber } from "../services/catways.js";

const router = Router();

router.post("/", createNewCatway);
router.get("/", getAllCatways);
router.get("/:id", getCatwayByNumber);


export default router;