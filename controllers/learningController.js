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
