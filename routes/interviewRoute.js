import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { getUserInterviews } from "../controllers/personalUserController.js";

const router = express.Router();

router.get("/", authMiddleware, getUserInterviews);
router.get("/invitations", authMiddleware, getInterviewInvitations);

export default router;
