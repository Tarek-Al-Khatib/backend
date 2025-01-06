import { InterviewModel } from "../models/main.js";

export const interviewRepository = {
  async getInterviewInvitations(userId) {
    const interviews = await InterviewModel.findMany({
      where: {
        OR: [{ user_id: userId }, { moderator_id: userId }],
        date: {
          gt: new Date(),
        },
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
        interview.feedback || interview.points === 0 ? "Pending" : "Completed",
      points: interview.points || "Pending",
    }));
  },

  async createInterview(interviewData) {
    const newInterview = await InterviewModel.create({
      data: {
        ...interviewData,
      },
    });

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
};
