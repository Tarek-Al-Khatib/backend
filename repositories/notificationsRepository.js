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
};
