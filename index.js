import app from "./app/app.js";
import http from "http";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoute.js";
import notificationRoutes from "./routes/notificationsRoute.js";
import communityRoutes from "./routes/communityRoute.js";
import interviewRoute from "./routes/interviewRoute.js";
import learningRoutes from "./routes/learningRoute.js";
import userRoutes from "./routes/personalUserRoute.js";
import { createSocketServer } from "./websocket/socket.js";

dotenv.config();

const server = http.createServer(app);
export const io = createSocketServer(server);

const PORT = process.env.PORT;

app.use("/api/auth", authRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/community", communityRoutes);
app.use("/api/learning", learningRoutes);
app.use("/api/user", userRoutes);
app.use("/api/interviews", interviewRoute);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
