import { InterviewModel } from "../models/main.js";

export const interviewRepository = {
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
      interviewer: interview.moderator?.username || "AI",
      feedback: interview.feedback || "Pending",
      status:
        interview.feedback || interview.points === 0
          ? "Pending"
          : interview.status,
      points: interview.points || "Pending",
    }));
  },
};
