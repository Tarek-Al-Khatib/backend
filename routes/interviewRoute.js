import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  getUserInterviews,
  getInterviewInvitations,
} from "../controllers/interviewController.js";

const router = express.Router();

router.get("/", authMiddleware, getUserInterviews);
router.get("/invitations", authMiddleware, getInterviewInvitations);
router.post("/", authMiddleware, createInterview);
export default router;
