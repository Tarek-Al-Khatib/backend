import { personalUserRepository } from "../repositories/personalUserRepository.js";

export const getUserInterviews = async (req, res) => {
  const userId = Number(req.params.userId);

  try {
    const interviews = await personalUserRepository.getUserInterviews(userId);

    return res.status(200).json({
      message: "Interviews fetched successfully",
      data: interviews,
    });
  } catch (error) {
    console.error("Error fetching interviews:", error);
    return res.status(500).json({
      message: "An error occurred while fetching the interviews",
    });
  }
};
