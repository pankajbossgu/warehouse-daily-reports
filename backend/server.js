import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import reportRoutes from "./routes/report.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Allow Codespaces frontend URL
const FRONTEND_URL = process.env.FRONTEND_URL || "https://redesigned-capybara-xv6pr9wjrpv29p59-5173.app.github.dev";

app.use(
  cors({
    origin: [FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());

// ✅ Simple test route
app.get("/api/test", (req, res) => {
  res.json({ message: "✅ Backend is running fine!" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/report", reportRoutes);

// ✅ Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}\n✅ CORS allowed for: ${FRONTEND_URL}`)
    );
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
