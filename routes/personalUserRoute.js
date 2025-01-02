import express from "express";
import { userController } from "../controllers/userController.js";

const router = express.Router();

router.get("/leaderboard/:userId", userController.getLeaderboardByPoints);
router.get("/profile/:userId", userController.getProfile);

export default router;
