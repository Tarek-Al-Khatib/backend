import { learningRepository } from "../repositories/learningRepository.js";
import { checkAndAssignAchievements } from "../utils/checkAchievements.js";
import { sendNotification } from "../utils/sendNotification.js";

export const getPlans = async (req, res) => {
  const userId = Number(req.params.userId);

  try {
    const plans = await learningRepository.getPlansByUserId(userId);
    res.status(200).json(plans);
  } catch (error) {
    console.error("Error in getPlans:", error);
    res.status(500).json({ error: "An error occurred while fetching plans." });
  }
};

export const addPlan = async (req, res) => {
  const userId = Number(req.params.userId);
  const { planData, steps } = req.body;

  try {
    const newPlan = await learningRepository.addPlan(planData, userId, steps);
    sendNotification(
      userId,
      "INFO",
      `Plan ${planData.title} Added at ${new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}`
    );
    await checkAndAssignAchievements(userId);
    res.status(200).json({
      message: "Learning plan added successfully.",
      plan: newPlan,
    });
  } catch (error) {
    console.error("Error in addPlan:", error);
    res
      .status(500)
      .json({ error: "An error occurred while adding the learning plan." });
  }
};

export const updatePlan = async (req, res) => {
  const planId = Number(req.params.planId);
  const { planData, steps } = req.body;

  try {
    await learningRepository.planExists(planId);

    const updatedPlan = await learningRepository.updatePlan(
      planId,
      planData,
      steps
    );
    res.status(200).json({
      message: "Plan updated successfully.",
      plan: updatedPlan,
    });
  } catch (error) {
    console.error("Error in updatePlan:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the plan." });
  }
};

export const markPlanAsDone = async (req, res) => {
  const planId = Number(req.params.planId);
  const userId = Number(req.params.userId);
  try {
    const markedPlan = await learningRepository.markAsDone(planId, userId);
    sendNotification(
      userId,
      "INFO",
      `Plan completed at ${new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}`
    );
    await checkAndAssignAchievements(userId);
    res.status(200).json({
      message: "Plan marked as done successfully.",
      plan: markedPlan,
    });
  } catch (error) {
    console.error("Error in markPlanAsDone:", error);
    res
      .status(500)
      .json({ error: "An error occurred while marking the plan as done." });
  }
};

export const markStepAsDone = async (req, res) => {
  const stepId = Number(req.params.stepId);
  const userId = Number(req.params.userId);

  try {
    const markedStep = await learningRepository.markStepAsDone(stepId, userId);
    sendNotification(
      userId,
      "INFO",
      `Step completed at ${new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}`
    );
    await checkAndAssignAchievements(userId);
    res.status(200).json({
      message: "Step marked as done successfully.",
      step: markedStep,
    });
  } catch (error) {
    console.error("Error in markStepAsDone:", error);
    res
      .status(500)
      .json({ error: "An error occurred while marking the step as done." });
  }
};

export const getUserStepsCompletedLastWeek = async (req, res) => {
  const userId = Number(req.params.userId);

  try {
    const steps = await learningRepository.getStepsCompletedLastWeek(userId);

    return res.status(200).json({
      message: "Steps completed in the last week fetched successfully",
      data: steps,
    });
  } catch (error) {
    console.error("Error fetching user steps completed last week:", error);
    return res.status(500).json({
      message:
        "An error occurred while fetching user steps completed last week",
    });
  }
};
