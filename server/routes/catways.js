import { Router } from "express";
import { createNewCatway, getAllCatways, getCatwayByNumber, editCatway } from "../services/catways.js";

const router = Router();

router.post("/", createNewCatway);
router.get("/", getAllCatways);
router.get("/:id", getCatwayByNumber);
router.put("/:id", editCatway);


export default router;