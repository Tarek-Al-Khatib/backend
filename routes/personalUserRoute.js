import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  getLeaderboardByPoints,
  getProfile,
} from "../controllers/personalUserController.js";

const router = express.Router();

router.get("/leaderboard", authMiddleware, getLeaderboardByPoints);
router.get("/profile", authMiddleware, getProfile);

export default router;
