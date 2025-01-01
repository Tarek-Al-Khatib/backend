import { notificationRepository } from "../repositories/notificationsRepository";

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
