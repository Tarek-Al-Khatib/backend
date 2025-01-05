import express from "express";
import {
  createNotification,
  getUserNotifications,
  markAsRead,
} from "../controllers/notificationController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createNotification);
router.get("/", authMiddleware, getUserNotifications);
router.patch("/:notificationId/read", authMiddleware, markAsRead);

export default router;
