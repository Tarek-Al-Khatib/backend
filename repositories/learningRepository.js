import { LearningPlanModel } from "../models/main.js";
import { LearningStepModel } from "../models/main.js";

export const learningRepository = {
  async getPlansByUserId(userId) {
    return LearningPlanModel.findMany({
      where: { user_id: userId },
      include: {
        steps: true,
      },
    });
  },

  async addPlan(planData, userId) {
    return LearningPlanModel.create({
      data: {
        ...planData,
        user_id: userId,
      },
    });
  },
};
