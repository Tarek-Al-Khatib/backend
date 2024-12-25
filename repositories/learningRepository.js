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

  async addPlan(planData, userId, steps) {
    const newPlan = await LearningPlanModel.create({
      data: {
        ...planData,
        user_id: userId,
      },
    });

    if (steps && steps.length > 0) {
      const stepData = steps.map((step) => ({
        ...step,
        learning_plan_id: newPlan.id,
      }));

      await LearningStepModel.createMany({
        data: stepData,
      });
    }
  },

  async updatePlan(planId, planData, steps) {
    if (planData) {
      await LearningPlanModel.update({
        where: { id: planId },
        data: planData,
      });
    }

    if (steps) {
      for (const step of steps) {
        if (step.id) {
          await LearningStepModel.update({
            where: { id: step.id },
            data: step,
          });
        } else {
          await LearningStepModel.create({
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
    const plan = await LearningPlanModel.update({
      where: { id: planId },
      data: { is_completed: true },
    });

    await LearningStepModel.updateMany({
      where: { learning_plan_id: planId },
      data: { is_completed: true },
    });

    return plan;
  },

  async markStepAsDone(stepId) {
    const step = await LearningStepModel.update({
      where: { id: stepId },
      data: { is_completed: true },
    });

    return step;
  },

  async planExists(planId) {
    try {
      await LearningPlanModel.findFirstOrThrow({
        where: { id: planId },
      });
      return true;
    } catch (error) {
      throw new Error(`Learning plan with ID ${planId} does not exist.`);
    }
  },

  async stepExists(stepId) {
    try {
      await LearningStepModel.findFirstOrThrow({
        where: { id: stepId },
      });
      return true;
    } catch (error) {
      throw new Error(`Learning plan with ID ${stepId} does not exist.`);
    }
  },
};
