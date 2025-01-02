import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { getUserInterviews } from "../controllers/personalUserController.js";

const router = express.Router();

router.get("/:userId", authMiddleware, getUserInterviews);

export default router;
