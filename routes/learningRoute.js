import express from "express";
import {
  addPlan,
  updatePlan,
  markPlanAsDone,
  markStepAsDone,
  getPlans,
  getUserStepsCompletedLastWeek,
} from "../controllers/learningController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getPlans);
router.post("/", authMiddleware, addPlan);
router.put("/:planId", authMiddleware, updatePlan);
router.put("/plan-done/:planId", authMiddleware, markPlanAsDone);
router.put("/step-done/:stepId", authMiddleware, markStepAsDone);
router.get("/last-week", authMiddleware, getUserStepsCompletedLastWeek);

export default router;
