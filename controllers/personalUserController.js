import { userRepository } from "../repositories/userRepository.js";

export const getLeaderboardByPoints = async (req, res) => {
  const userId = Number(req.params.userId);

  try {
    const leaderboardData = await userRepository.getLeaderboardByPoints(userId);

    return res.status(200).json({
      message: "Leaderboard fetched successfully",
      data: leaderboardData,
    });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return res.status(500).json({
      message: "An error occurred while fetching the leaderboard",
    });
  }
};
