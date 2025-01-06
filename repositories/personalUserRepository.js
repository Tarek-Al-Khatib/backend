import { UserModel } from "../models/main.js";

export const personalUserRepository = {
  async getLeaderboardByPoints(userId) {
    const users = await UserModel.findMany({
      orderBy: {
        points: "desc",
      },
      take: 9,
      select: {
        id: true,
        username: true,
        points: true,
        _count: {
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
        _count: {
          select: {
            interviews: true,
            learning_plans: true,
          },
        },
      },
    });

    return (() => {
      const leaderboard = users
        .filter((user) => user.id !== userRank.id)
        .map((user) => ({
          id: user.id,
          username: user.username,
          points: user.points,
          interviews: user._count.interviews,
          learningPlans: user._count.learning_plans,
        }));

      const fullLeaderboard = [
        ...leaderboard,
        {
          id: userRank.id,
          username: userRank.username,
          points: userRank.points,
          interviews: userRank._count.interviews,
          learningPlans: userRank._count.learning_plans,
        },
      ];

      const currentUserRank =
        fullLeaderboard.findIndex((user) => user.id === userRank.id) + 1;

      return {
        leaderboard,
        currentUser: {
          id: userRank.id,
          username: userRank.username,
          points: userRank.points,
          interviews: userRank._count.interviews,
          learningPlans: userRank._count.learning_plans,
          rank: currentUserRank,
        },
      };
    })();
  },
  async getProfile(userId) {
    const user = await UserModel.findUniqueOrThrow({
      where: { id: userId },
      select: {
        username: true,
        email: true,
        points: true,
        level: true,
        user_badges: {
          include: {
            badge: true,
          },
        },
      },
    });

    return {
      username: user.username,
      email: user.email,
      points: user.points,
      level: user.level,
      badges: user.user_badges.map((ub) => ({
        title: ub.badge.title,
        description: ub.badge.description,
        icon: ub.badge.icon,
      })),
    };
  },
};
