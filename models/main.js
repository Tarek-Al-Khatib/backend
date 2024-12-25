import prisma from "../config/database";

export const UserModel = prisma.users;
export const BadgeModel = prisma.badges;
export const UserBadgeModel = prisma.userBadges;
export const NotificationModel = prisma.notifications;
export const LearningPlanModel = prisma.learningPlans;
export const LearningStepModel = prisma.learningSteps;
export const InterviewModel = prisma.interviews;
export const ChatModel = prisma.chats;
export const CommunityMemberModel = prisma.communityMembers;
export const CommunityChannelModel = prisma.communityChannels;
export const CommunityModel = prisma.communities;
