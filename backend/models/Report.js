import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  name: { type: String, required: true },
  task: { type: String, required: true },
  remarks: { type: String },
  quantity: { type: Number, required: true },
  timing: { type: String, required: true },
  duration: { type: String, required: true },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Report", reportSchema);
