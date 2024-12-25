import { LearningPlanModel } from "../models/main.js";
import { LearningStepModel } from "../models/main.js";

export const learningRepository = {
  async getPlansByUserId(userId) {
    return prisma.learningPlans.findMany({
      where: { user_id: userId },
      include: {
        steps: true,
      },
    });
  },
};
