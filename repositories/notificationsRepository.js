import { NotificationModel } from "../models/main";

export const notificationRepository = {
  async createNotification(notificationData) {
    try {
      return await NotificationModel.create({
        data: {
          ...notificationData,
        },
      });
    } catch (error) {
      throw new Error("Error creating notification: " + error.message);
    }
  },

  async getUserNotifications(userId) {
    try {
      return await NotificationModel.findMany({
        where: {
          user_id: userId,
        },
        orderBy: {
          created_at: "desc",
        },
      });
    } catch (error) {
      throw new Error("Error fetching notifications: " + error.message);
    }
  },
};
