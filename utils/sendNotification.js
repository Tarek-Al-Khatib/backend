import { io } from "../index.js";
import { notificationRepository } from "../repositories/notificationsRepository.js";

export const sendNotification = async (user_id, type, message) => {
  try {
    const notification = await notificationRepository.createNotification({
      message,
      type,
      user_id,
    });

    io.to(`user-${user_id}`).emit("receiveNotification", notification);
  } catch (error) {
    console.error("Error in createNotification:", error);
  }
};
