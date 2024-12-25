import express from "express";
import {
  addPlan,
  updatePlan,
  markPlanAsDone,
  markStepAsDone,
  getPlans,
} from "../controllers/learningController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/:userId", authMiddleware, getPlans);
router.post("/:userId", authMiddleware, addPlan);
router.put("/:planId", authMiddleware, updatePlan);
router.put("/plan-done/:planId", authMiddleware, markPlanAsDone);
router.put("/step-done/:stepId", authMiddleware, markStepAsDone);

export default router;
