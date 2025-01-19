import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  getLeaderboardByPoints,
  getProfile,
  getUserById,
  updateProfileImage,
} from "../controllers/personalUserController.js";
import upload from "../middlewares/multerMiddleware.js";
const router = express.Router();

router.get("/leaderboard", authMiddleware, getLeaderboardByPoints);
router.get("/profile", authMiddleware, getProfile);
router.get("/", authMiddleware, getUserById);
router.put(
  "/image",
  authMiddleware,
  upload.fields([{ name: "profile_image", maxCount: 1 }]),
  updateProfileImage
);
export default router;
