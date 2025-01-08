import { io } from "../index.js";

export const sendnotification = (userId, type, message) => {
  io.to(`user-${userId}`).emit("receiveNotification", { type, message });
};
