import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

/* ===========================================================
   🔹 REGISTER USER (Employee waits for approval, Admin auto-approved)
   =========================================================== */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);

    // ✅ Auto-approve admin based on email
    const isAdminEmail = email === "pankajsingh989980@gmail.com"; // your admin email

    const newUser = new User({
      name,
      email,
      password: hashed,
      role: isAdminEmail ? "admin" : "employee",
      approved: isAdminEmail ? true : false,
      isAdmin: isAdminEmail ? true : false,
    });

    await newUser.save();

    res.json({
      message: isAdminEmail
        ? "Admin registered successfully!"
        : "User registered. Awaiting admin approval.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during registration" });
  }
});

/* ===========================================================
   🔹 LOGIN USER (Only approved users can log in)
   =========================================================== */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    if (!user.approved)
      return res.status(403).json({ message: "User not approved yet" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
        isAdmin: user.isAdmin || false,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        isAdmin: user.isAdmin || false,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during login" });
  }
});

/* ===========================================================
   🔹 ADMIN: GET ALL USERS
   =========================================================== */
router.get("/admin/users", async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.json(users);
  } catch (err) {
    console.error("❌ Error fetching users:", err);
    res.status(500).json({ message: "Error fetching users" });
  }
});

/* ===========================================================
   🔹 ADMIN: APPROVE USER
   =========================================================== */
router.put("/admin/approve/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOneAndUpdate(
      { email },
      { approved: true },
      { new: true }
    );
    if (!user)
      return res.status(404).json({ message: "User not found" });
    res.json({ message: `✅ User ${email} approved successfully` });
  } catch (err) {
    console.error("❌ Error approving user:", err);
    res.status(500).json({ message: "Error approving user" });
  }
});

/* ===========================================================
   🔹 ADMIN: MAKE USER AN ADMIN
   =========================================================== */
router.put("/admin/make-admin/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOneAndUpdate(
      { email },
      { isAdmin: true, approved: true, role: "admin" },
      { new: true }
    );
    if (!user)
      return res.status(404).json({ message: "User not found" });
    res.json({ message: `✅ ${email} is now an admin` });
  } catch (err) {
    console.error("❌ Error making user admin:", err);
    res.status(500).json({ message: "Error making user admin" });
  }
});

export default router;
