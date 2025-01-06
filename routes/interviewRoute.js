import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  getUserInterviews,
  getInterviewInvitations,
  createInterview,
  updateInterview,
  updateStatus,
} from "../controllers/interviewController.js";

const router = express.Router();

router.get("/", authMiddleware, getUserInterviews);
router.get("/invitations", authMiddleware, getInterviewInvitations);
router.post("/", authMiddleware, createInterview);
router.put("/:interviewId", authMiddleware, updateInterview);
router.put("/:interviewId/status", authMiddleware, updateStatus);
export default router;
