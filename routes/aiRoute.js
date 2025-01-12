import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  completedAiInterview,
  interviewChat,
} from "../controllers/aiController.js";

const router = express.Router();

router.post("/interview", authMiddleware, interviewChat);
router.post("/completed", authMiddleware, completedAiInterview);
export default router;
