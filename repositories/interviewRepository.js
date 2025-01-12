import { InterviewModel, UserModel } from "../models/main.js";
import { incrementUserPoints } from "../utils/IncrementUserPoints.js";

export const interviewRepository = {
  async getInterviewInvitations(userId) {
    const interviews = await InterviewModel.findMany({
      where: {
        OR: [{ user_id: userId }, { moderator_id: userId }],
        completed_at: null,
      },
      include: {
        user: true,
        moderator: true,
      },
    });

    return interviews;
  },
  async getUserInterviews(userId) {
    const interviews = await InterviewModel.findMany({
      where: {
        user_id: userId,
        date: { lte: new Date() },
      },
      include: {
        moderator: true,
      },
    });

    return interviews.map((interview) => ({
      id: interview.id,
      date: interview.date,
      interviewer: interview.moderator || "AI",
      feedback: interview.feedback || "Pending",
      status:
        interview.feedback === null && interview.points === 0
          ? "Pending"
          : "Completed",
      points: interview.points || "Pending",
    }));
  },

  async createInterview(interviewData) {
    const newInterview = await InterviewModel.create({
      data: {
        ...interviewData,
      },
    });
    if (interviewData.points && interviewData.points != 0) {
      await incrementUserPoints(interviewData.user_id, interviewData.points);
    }
    return newInterview;
  },

  async updateInterview(interviewId, data, userId) {
    const updatedInterview = await InterviewModel.update({
      where: {
        id: interviewId,
        OR: [{ user_id: userId }, { moderator_id: userId }],
      },
      data: {
        feedback: data.feedback,
        status: data.status,
        points: data.points,
      },
    });

    await incrementUserPoints(userId, data.points);

    return updatedInterview;
  },

  async updateStatus(interviewId, status, userId) {
    const updatedInterview = await InterviewModel.update({
      where: {
        id: interviewId,
        OR: [{ user_id: userId }, { moderator_id: userId }],
      },
      data: {
        status: status,
      },
    });

    return updatedInterview;
  },

  async completedInterview(interviewId) {
    const updatedInterview = await InterviewModel.update({
      where: {
        id: interviewId,
      },
      data: {
        completed_at: new Date(),
      },
    });

    return updatedInterview;
  },
};
