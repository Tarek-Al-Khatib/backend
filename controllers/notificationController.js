import { notificationRepository } from "../repositories/notificationsRepository.js";

export const createNotification = async (req, res) => {
  const { message, type, user_id } = req.body;

  try {
    const notification = await notificationRepository.createNotification({
      message,
      type,
      user_id,
    });

    res.status(200).json(notification);
  } catch (error) {
    console.error("Error in createNotification:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getUserNotifications = async (req, res) => {
  const userId = Number(req.params.userId);

  try {
    const notifications = await notificationRepository.getUserNotifications(
      userId
    );
    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error in getUserNotifications:", error);
    res.status(500).json({ error: error.message });
  }
};

export const markAsRead = async (req, res) => {
  const notificationId = Number(req.params.notificationId);

  try {
    await notificationRepository.markAsRead(notificationId);
    res.status(200).json({ message: "Notification marked as read." });
  } catch (error) {
    console.error("Error in markAsRead:", error);
    res.status(500).json({ error: error.message });
  }
};
