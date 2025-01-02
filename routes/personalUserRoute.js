import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { userController } from "../controllers/userController.js";

const router = express.Router();

router.get(
  "/leaderboard/:userId",
  authMiddleware,
  userController.getLeaderboardByPoints
);
router.get("/profile/:userId", authMiddleware, userController.getProfile);

export default router;
