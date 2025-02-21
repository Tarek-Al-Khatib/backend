import { UserBadgeModel, UserModel } from "../models/main.js";
import { fullUrl } from "../utils/getFullURL.js";
import { sendNotification } from "../utils/sendNotification.js";

export const personalUserRepository = {
  async getLeaderboardByPoints(userId) {
    const allUsers = await UserModel.findMany({
      include: {
        _count: {
          select: {
            interviews: true,
            learning_plans: true,
          },
        },
      },
    });

    const sortedUsers = allUsers.sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b._count.interviews !== a._count.interviews)
        return b._count.interviews - a._count.interviews;
      return b._count.learning_plans - a._count.learning_plans;
    });

    const currentUserRank =
      sortedUsers.findIndex((user) => user.id === userId) + 1;

    const topUsers = sortedUsers.slice(0, 9);

    const isUserInLeaderboard = topUsers.some((user) => user.id === userId);

    const leaderboardWithUser = topUsers.map((user) => ({
      id: user.id,
      username: user.username,
      points: user.points,
      interviews: user._count.interviews,
      learningPlans: user._count.learning_plans,
      isCurrentUser: user.id === userId,
      profile_pic: user.profile_pic,
      rank: sortedUsers.findIndex((u) => u.id === user.id),
    }));

    if (!isUserInLeaderboard) {
      const currentUser = sortedUsers.find((user) => user.id === userId);
      leaderboardWithUser.push({
        id: currentUser.id,
        username: currentUser.username,
        points: currentUser.points,
        interviews: currentUser._count.interviews,
        learningPlans: currentUser._count.learning_plans,
        isCurrentUser: true,
        rank: currentUserRank,
      });
    }

    return leaderboardWithUser;
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

  async updatePicture(profileImageName, userId, req) {
    const url = fullUrl(req);
    const user = await UserModel.update({
      where: {
        id: userId,
      },
      data: {
        profile_pic: `${url}/uploads/${profileImageName}`,
      },
    });

    return user;
  },

  async addAiLearningBadge(userId) {
    const user = await UserModel.findUnique({
      where: {
        id: userId,
      },
      include: {
        user_badges: true,
      },
    });

    if (!user.user_badges.some((b) => b.badges_id === 12)) {
      await UserBadgeModel.create({
        data: {
          user_id: userId,
          badges_id: 12,
        },
      });
      sendNotification(
        userId,
        "INFO",
        "You've earned a badge: Used AI in learning plans"
      );
    }
  },
};
