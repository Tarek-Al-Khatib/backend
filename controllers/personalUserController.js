import { personalUserRepository } from "../repositories/personalUserRepository.js";
import { userRepository } from "../repositories/userRepository.js";

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

export const getUserById = async (req, res) => {
  try {
    const userId = Number(req.params.userId);

    const user = await userRepository.findById(userId);

    return res.status(200).json({
      message: "Fetched user successfuly",
      user: user,
    });
  } catch (error) {
    console.log("Error fetching the user by id:", error);
    return res.status(500).json({
      message: "Error fetching the user by id",
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
