import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  getLeaderboardByPoints,
  getProfile,
  getUserById,
} from "../controllers/personalUserController.js";

const router = express.Router();

router.get("/leaderboard", authMiddleware, getLeaderboardByPoints);
router.get("/profile", authMiddleware, getProfile);
router.get("/:userId", authMiddleware, getUserById);

export default router;
