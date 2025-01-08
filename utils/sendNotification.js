import { io } from "../index.js";
import { notificationRepository } from "../repositories/notificationsRepository.js";

export const sendnotification = async (userId, type, message) => {
  try {
    const notification = await notificationRepository.createNotification({
      message,
      type,
      userId,
    });

    io.to(`user-${userId}`).emit("receiveNotification", notification);
  } catch (error) {
    console.error("Error in createNotification:", error);
  }
};
