import app from "./app/app.js";
import http from "http";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoute.js";
import communityRoutes from "./routes/communityRoute.js";
import learningRoutes from "./routes/learningRoute.js";
import { createSocketServer } from "./websocket/socket.js";

dotenv.config();

const server = http.createServer(app);
createSocketServer(server);

const PORT = process.env.PORT;

app.use("/api/auth", authRoutes);
app.use("/api/community", communityRoutes);
app.use("/api/learning", learningRoutes);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
