import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";
import cors from "cors";
import path from "path";
import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();


app.use(
  cors({
    origin: [
      "http://localhost:5173", 
      "https://your-frontend-app.onrender.com", 
    ],
    credentials: true,
  })
);


app.use(express.json());
app.use(cookieParser());

// ✅ API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
