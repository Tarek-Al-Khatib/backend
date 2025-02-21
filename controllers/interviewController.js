import { interviewRepository } from "../repositories/interviewRepository.js";
import { checkAndAssignAchievements } from "../utils/checkAchievements.js";
import { scheduleInterviewReminders } from "../utils/scheduleReminders.js";
import { sendNotification } from "../utils/sendNotification.js";
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
    await checkAndAssignAchievements(userId);
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
  console.log(req.body);
  const data = req.body;

  try {
    const updatedInterview = await interviewRepository.updateInterview(
      interviewId,
      data,
      userId
    );

    await checkAndAssignAchievements(userId);
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

    sendNotification(
      updatedInterview.user.id,
      "INFO",
      `Interview ${status.toLowerCase()} by ${
        updatedInterview.moderator.username
      }`
    );

    if (updatedInterview.status === "ACCEPTED") {
      scheduleInterviewReminders(updatedInterview);
    }
    await checkAndAssignAchievements(userId);
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

export const completedInterview = async (req, res) => {
  const interviewId = Number(req.params.interviewId);

  try {
    const updatedInterview = await interviewRepository.completedInterview(
      interviewId
    );

    await checkAndAssignAchievements(userId);
    return res.status(200).json({
      message: "Interview completed successfully",
      data: updatedInterview,
    });
  } catch (error) {
    console.error("Error completing interview:", error);
    return res.status(500).json({
      message: "An error occurred while updating the interview",
    });
  }
};
