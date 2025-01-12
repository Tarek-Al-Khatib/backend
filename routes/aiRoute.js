import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  completedAiInterview,
  enhancePlan,
  interviewChat,
} from "../controllers/aiController.js";

const router = express.Router();

router.post("/interview", authMiddleware, interviewChat);
router.post("/completed", authMiddleware, completedAiInterview);
router.post("/enhance", enhancePlan);
export default router;
