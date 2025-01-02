import { interviewRepository } from "../repositories/interviewRepository";

export const getUserInterviews = async (req, res) => {
  const userId = Number(req.params.userId);

  try {
    const interviews = await interviewRepository.getUserInterviews(userId);

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

export const getInterviewInvitations = async (req, res) => {
  const userId = Number(req.params.userId);

  try {
    const invitations = await interviewRepository.getInterviewInvitations(
      userId
    );

    return res.status(200).json({
      message: "Interview invitations fetched successfully",
      data: invitations,
    });
  } catch (error) {
    console.error("Error fetching interview invitations:", error);
    return res.status(500).json({
      message: "An error occurred while fetching interview invitations",
    });
  }
};
