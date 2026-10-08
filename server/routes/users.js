import { Router } from "express";
import { protect } from "../middleware/auth.js";
import { createNewUser, getAllUsers, getUserByEmail, editUser, deleteUser } from "../services/users.js";

const router = Router();

router.post("/", createNewUser);
router.get("/", protect, getAllUsers);
router.get("/:email", protect, getUserByEmail);
router.put("/:email", protect, editUser);
router.delete("/:email", protect, deleteUser);

export default router;
