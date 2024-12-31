import { Server } from "socket.io";
import http from "http";
import app from "../app/app.js";

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected", socket.id);
});
