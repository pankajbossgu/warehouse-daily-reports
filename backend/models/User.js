import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "employee" }, // "admin" or "employee"
  approved: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false }, // 🔹 new
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);
