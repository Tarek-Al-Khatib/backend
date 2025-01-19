import prisma from "../database/database.js";
import { BadgeModel, UserBadgeModel, UserModel } from "../models/main.js";

export const checkAndAssignAchievements = async (userId) => {
  try {
    const user = await UserModel.findUnique({
      where: { id: userId },
      include: {
        user_badges: true,
        learning_plans: true,
        community_members: true,
        interviews: true,
      },
    });

    if (!user) throw new Error("User not found");

    const badges = await BadgeModel.findMany();
    const earnedBadgeIds = user.user_badges.map((ub) => ub.badges_id);

    const achievements = [
      {
        id: 1,
        condition: user.community_members.length >= 1,
        badgeTitle: "Joined First Community",
      },
      {
        id: 2,
        condition: user.learning_plans.length >= 1,
        badgeTitle: "Created First Learning Plan",
      },
      {
        id: 3,
        condition:
          user.interviews.length >= 1 &&
          user.interviews.some((i) => i.feedback !== null),
        badgeTitle: "Attended First Interview",
      },
      {
        id: 4,
        condition: user.learning_plans.length > 5,
        badgeTitle: "Created More Than 5 Learning Plans",
      },
      {
        id: 5,
        condition: user.community_members.length > 3,
        badgeTitle: "Joined More Than 3 Communities",
      },
      {
        id: 6,
        condition:
          user.interviews.filter((i) => i.completed_at != null).length >= 5,
        badgeTitle: "Attended More Than 5 Interviews",
      },
      {
        id: 7,
        condition: user.points >= 100,
        badgeTitle: "Reached 100 Points",
      },
      {
        id: 8,
        condition: user.points >= 300,
        badgeTitle: "Reached 300 Points",
      },
      {
        id: 9,
        condition: user.points >= 1000,
        badgeTitle: "Reached 1000 Points",
      },
      {
        id: 10,
        condition:
          user.learning_plans.filter((lp) => lp.is_completed).length > 3,
        badgeTitle: "Completed More Than 3 Learning Plans",
      },
      {
        id: 11,
        condition: user.interviews.some((i) => i.type === "AI"),
        badgeTitle: "Used AI for Interviews for the First Time",
      },
    ];

    console.log(achievements);
    const badgesToAssign = achievements
      .filter(
        (achievement) =>
          achievement.condition &&
          !earnedBadgeIds.includes(
            badges.find((b) => b.id === achievement.id)?.id
          )
      )
      .map((achievement) => badges.find((b) => b.id === achievement.id));

    for (const badge of badgesToAssign) {
      if (badge) {
        await UserBadgeModel.create({
          data: {
            user_id: userId,
            badges_id: badge.id,
          },
        });
      }
    }

    return {
      message: `${badgesToAssign.length} new badges earned`,
    };
  } catch (error) {
    console.error("Error assigning achievements:", error);
    throw error;
  }
};
