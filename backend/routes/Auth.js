import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
import auth from "../middleware/auth.js";

dotenv.config();
const router = express.Router();

// --- @route   POST api/auth/signup ---
// --- @desc    Register a new user ---
// --- @access  Public ---
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  // Simple validation
  if (!username || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    // Check for existing user
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Generate a 4-digit userId based on timestamp
    const now = new Date();
    const userId = String(now.getTime()).slice(-4);

    // Create new user
    user = new User({
      username,
      email,
      password,
      userId,
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user to database
    await user.save();

    // Create and sign a JWT
    const payload = {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        userId: user.userId,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "7d" }, // Set to 7 days
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// --- @route   POST api/auth/login ---
// --- @desc    Authenticate user & get token ---
// --- @access  Public ---
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    // Check for user
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    // Create and sign a JWT
    const payload = {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        userId: user.userId,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "7d" }, // Set to 7 days
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// --- @route   DELETE api/auth/delete-account ---
// --- @desc    Delete user account ---
// --- @access  Private ---
router.delete("/delete-account", auth, async (req, res) => {
  try {
    // Remove user
    await User.findByIdAndDelete(req.user.id);
    res.json({ msg: "User deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// --- @route   PUT api/auth/update-profile ---
// --- @desc    Update user profile ---
// --- @access  Private ---
router.put("/update-profile", auth, async (req, res) => {
  const { username, email } = req.body;

  // Simple validation
  if (!username || !email) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    let user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    user.username = username;
    user.email = email;

    await user.save();

    res.json({
      username: user.username,
      email: user.email,
      userId: user.userId,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

export default router;
