import { Router } from "express";
import { protect } from "../middleware/auth.js";
import { authenticate, logout } from "../services/auth.js";
const router = Router();

router.post("/login", authenticate);
router.get("/logout", protect, logout);

export default router;