import app from "./app/app.js";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoute.js";
import communityRoutes from "./routes/communityRoute.js";
import learningRoutes from "./routes/learningRoute.js";

dotenv.config();

const PORT = process.env.PORT;

app.use("/api/auth", authRoutes);
app.use("/api/community", communityRoutes);
app.use("/api/learning", learningRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
