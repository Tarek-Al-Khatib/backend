import { UserModel } from "../models/main";

export const userRepository = {
  async getLeaderboardByPoints(userId) {
    const users = await UserModel.findMany({
      orderBy: {
        points: "desc",
      },
      take: 20,
      select: {
        id: true,
        username: true,
        points: true,
        count: {
          select: {
            interviews: true,
            learning_plans: true,
          },
        },
      },
    });

    const userRank = await UserModel.findUniqueOrThrow({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        points: true,
        count: {
          select: {
            interviews: true,
            learning_plans: true,
          },
        },
      },
    });

    return {
      leaderboard: users.map((user) => ({
        id: user.id,
        username: user.username,
        points: user.points,
        interviews: user.count.interviews,
        learningPlans: user.count.learning_plans,
      })),
      currentUser: {
        id: userRank.id,
        username: userRank.username,
        points: userRank.points,
        interviews: userRank.count.interviews,
        learningPlans: userRank.count.learning_plans,
      },
    };
  },
};
