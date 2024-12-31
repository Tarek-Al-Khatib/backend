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
      console.log(`User ${socket.id} joined channel ${channelId}`);
    });

    socket.on("sendMessage", async ({ channelId, userId, messageContent }) => {
      try {
        const message = await communityRepository.saveMessage(
          channelId,
          userId,
          messageContent
        );
        io.to(channelId).emit("receiveMessage", message);
      } catch (error) {
        console.error("Error saving message:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  return io;
}
