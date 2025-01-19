import { Server } from "socket.io";
import { communityRepository } from "../repositories/communityRepository.js";

export function createSocketServer(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected", socket.id);

    socket.on("joinChannel", (channelId) => {
      socket.join(channelId);
    });

    socket.on("joinUserRoom", (userId) => {
      socket.join(`user-${userId}`);
    });

    socket.on("sendNotification", ({ userId, notification }) => {
      io.to(`user-${userId}`).emit("receiveNotification", notification);
    });

    socket.on("sendMessage", async ({ channelId, userId, messageContent }) => {
      try {
        const message = await communityRepository.saveMessage(
          channelId,
          userId,
          messageContent
        );
        socket.to(channelId).emit("receiveMessage", message);
      } catch (error) {
        console.error("Error saving message:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });

    socket.on("leavingChannel", (channelId) => {
      socket.leave(channelId);
    });

    socket.on("leaveRoom", (userId) => {
      socket.leave(`user-${userId}`);
    });
  });

  return io;
}
