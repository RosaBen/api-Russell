import { Router } from "express";
import { authenticate } from "../services/auth.js";
const router = Router();

router.post("/login", authenticate);

export default router;