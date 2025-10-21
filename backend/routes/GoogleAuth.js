import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// @route   GET /api/google
// @desc    Authenticate with Google
// @access  Public
router.get(
  "/",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// @route   GET /api/google/callback
// @desc    Google OAuth callback
// @access  Public
router.get(
  "/callback",
  passport.authenticate("google", { failureRedirect: "/", session: false }),
  (req, res) => {
    // Successful authentication, generate a JWT
    const payload = {
      user: {
        id: req.user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600 }, // 1 hour
      (err, token) => {
        if (err) throw err;
        // Redirect to frontend with token
        res.redirect(`${process.env.FRONTEND_URL}/dashboard?token=${token}`);
      }
    );
  }
);

export default router;
