import { personalUserRepository } from "../repositories/personalUserRepository";

export const getLeaderboardByPoints = async (req, res) => {
  const userId = Number(req.params.userId);

  try {
    const leaderboardData = await personalUserRepository.getLeaderboardByPoints(
      userId
    );

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

export const getProfile = async (req, res) => {
  const userId = Number(req.params.userId);

  try {
    const profileData = await personalUserRepository.getProfile(userId);

    return res.status(200).json({
      message: "Profile fetched successfully",
      data: profileData,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return res.status(500).json({
      message: "An error occurred while fetching the profile",
    });
  }
};
