import { learningRepository } from "../repositories/learningRepository.js";

export const getPlans = async (req, res) => {
  const userId = req.params.userId;

  try {
    const plans = await learningRepository.getPlansByUserId(userId);
    res.status(200).json(plans);
  } catch (error) {
    console.error("Error in getPlans:", error);
    res.status(500).json({ error: "An error occurred while fetching plans." });
  }
};

export const addPlan = async (req, res) => {
  const userId = req.params.userId;
  const planData = req.body;

  try {
    const newPlan = await learningRepository.addPlan(planData, userId);
    res.status(200).json({
      message: "Plan added successfully.",
      plan: newPlan,
    });
  } catch (error) {
    console.error("Error in addPlan:", error);
    res.status(500).json({ error: "An error occurred while adding the plan." });
  }
};

export const updatePlan = async (req, res) => {
  const planId = req.params.planId;
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
