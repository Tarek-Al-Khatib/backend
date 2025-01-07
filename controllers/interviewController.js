import { interviewRepository } from "../repositories/interviewRepository.js";

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
export const createInterview = async (req, res) => {
  try {
    const data = req.body;

    const newInterview = await interviewRepository.createInterview(data);

    return res.status(200).json({
      message: "Interview created successfully",
      data: newInterview,
    });
  } catch (error) {
    console.error("Error creating interview:", error);
    return res.status(500).json({
      message: "An error occurred while creating the interview",
    });
  }
};

export const updateInterview = async (req, res) => {
  const interviewId = Number(req.params.interviewId);
  const userId = Number(req.params.userId);
  const data = req.body;

  try {
    const updatedInterview = await interviewRepository.updateInterview(
      interviewId,
      data
    );

    return res.status(200).json({
      message: "Interview updated successfully",
      data: updatedInterview,
    });
  } catch (error) {
    console.error("Error updating interview:", error);
    return res.status(500).json({
      message: "An error occurred while updating the interview",
    });
  }
};

export const updateStatus = async (req, res) => {
  const interviewId = Number(req.params.interviewId);
  const userId = Number(req.params.userId);
  const { status } = req.body;

  try {
    const updatedInterview = await interviewRepository.updateStatus(
      interviewId,
      status,
      userId
    );

    return res.status(200).json({
      message: "Interview status updated successfully",
      data: updatedInterview,
    });
  } catch (error) {
    console.error("Error updating interview:", error);
    return res.status(500).json({
      message: "An error occurred while updating the interview",
    });
  }
};
