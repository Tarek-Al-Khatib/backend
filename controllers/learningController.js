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
