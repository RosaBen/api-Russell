import { Router } from "express";
import { authenticate, logout } from "../services/auth.js";
const router = Router();

router.post("/login", authenticate);
router.get("/logout", logout);

export default router;