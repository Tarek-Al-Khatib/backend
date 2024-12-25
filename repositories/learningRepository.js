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

  async updatePlan(planId, planData, steps) {
    if (planData) {
      await prisma.learningPlans.update({
        where: { id: planId },
        data: planData,
      });
    }

    if (steps) {
      for (const step of steps) {
        if (step.id) {
          await prisma.learningSteps.update({
            where: { id: step.id },
            data: step,
          });
        } else {
          await prisma.learningSteps.create({
            data: {
              ...step,
              learning_plan_id: planId,
            },
          });
        }
      }
    }

    return LearningPlanModel.findUnique({
      where: { id: planId },
      include: {
        steps: true,
      },
    });
  },

  async markAsDone(planId) {
    const plan = await prisma.learningPlans.update({
      where: { id: planId },
      data: { is_completed: true },
    });

    await prisma.learningSteps.updateMany({
      where: { learning_plan_id: planId },
      data: { is_completed: true },
    });

    return plan;
  },
};
