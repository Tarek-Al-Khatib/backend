import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { interviewChat } from "../controllers/aiController.js";

const router = express.Router();

router.post("/interview", authMiddleware, interviewChat);
export default router;
