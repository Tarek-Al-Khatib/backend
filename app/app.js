import express from "express";
import cors from "cors";
import authRoutes from "../routes/authRoute.js";
import notificationRoutes from "../routes/notificationsRoute.js";
import communityRoutes from "../routes/communityRoute.js";
import interviewRoute from "../routes/interviewRoute.js";
import learningRoutes from "../routes/learningRoute.js";
import userRoutes from "../routes/personalUserRoute.js";
import videoRoutes from "../routes/videoRoute.js";
import aiRoutes from "../routes/aiRoute.js";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/community", communityRoutes);
app.use("/api/learning", learningRoutes);
app.use("/api/user", userRoutes);
app.use("/api/interviews", interviewRoute);
app.use("/api/meeting", videoRoutes);
app.use("/api/ai", aiRoutes);

app.use("/uploads", express.static("uploads"));

export default app;
