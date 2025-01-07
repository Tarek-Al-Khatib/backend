import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  getLeaderboardByPoints,
  getProfile,
  getUserById,
  updateProfileImage,
} from "../controllers/personalUserController.js";

const router = express.Router();

router.get("/leaderboard", authMiddleware, getLeaderboardByPoints);
router.get("/profile", authMiddleware, getProfile);
router.get("/:userId", authMiddleware, getUserById);
router.put("/image", authMiddleware, updateProfileImage);
export default router;
