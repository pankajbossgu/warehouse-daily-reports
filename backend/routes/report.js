import express from "express";
import Report from "../models/Report.js";

const router = express.Router();

// ✅ Create a new report
router.post("/", async (req, res) => {
  try {
    const { name, task, remarks, quantity, timing, duration, completed } = req.body;

    if (!name || !task || !quantity || !timing || !duration) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newReport = new Report({
      name,
      task,
      remarks,
      quantity,
      timing,
      duration,
      completed,
    });

    await newReport.save();
    res.status(201).json(newReport);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Get all reports
router.get("/", async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
