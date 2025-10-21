import express from "express";
import auth from "../middleware/auth.js"; // Middleware to verify token
import User from "../models/User.js";

const router = express.Router();

// --- @route   GET api/protected/user ---
// --- @desc    Get logged-in user data ---
// --- @access  Private ---
// The 'auth' middleware runs first. If the token is valid, it calls the next function.
router.get("/user", auth, async (req, res) => {
  try {
    // The auth middleware adds the user object (with id) to the request.
    // We find the user by their ID and exclude the password from the result.
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

export default router;
