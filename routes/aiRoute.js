import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  completedAiInterview,
  enhancePlan,
  interviewChat,
  topLearningPicks,
} from "../controllers/aiController.js";

const router = express.Router();

router.post("/interview", authMiddleware, interviewChat);
router.post("/completed", authMiddleware, completedAiInterview);
router.post("/enhance", enhancePlan);
router.post("/top-plans", topLearningPicks);
export default router;
