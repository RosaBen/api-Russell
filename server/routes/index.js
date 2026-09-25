import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  res.status(200).json({
    name: process.env.APP_NAME,
    message: "bienvenue"
  });

});
export default router;