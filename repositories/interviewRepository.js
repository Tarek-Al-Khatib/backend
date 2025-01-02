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
};
