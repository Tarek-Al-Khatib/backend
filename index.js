import app from "./app/app.js";
import http from "http";
import dotenv from "dotenv";
import { createSocketServer } from "./websocket/socket.js";

dotenv.config();

const server = http.createServer(app);
export const io = createSocketServer(server);

const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
