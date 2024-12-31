import { Server } from "socket.io";
import http from "http";
import app from "../app/app.js";
import { communityRepository } from "../repositories/communityRepository.js";

const server = http.createServer(app);

const io = new Server(server, {
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

  socket.on("sendMessage", async ({ channelId, userId, message }) => {
    try {
      await communityRepository.saveMessage(channelId, userId, message);
      io.to(channelId).emit("receiveMessage", message);
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(1738, () => {
  console.log("Server running on port 1738");
});
