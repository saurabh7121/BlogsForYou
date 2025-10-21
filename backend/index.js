import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";

// Load environment variables
dotenv.config();

// Import Passport configuration
import "./config/passport-setup.js";

// Import routes
import authRoutes from "./routes/Auth.js";
import protectedRoutes from "./routes/Protected.js";
import googleAuthRoutes from "./routes/GoogleAuth.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Session middleware for Passport
// Note: In a production environment, you should use a more robust session store like connect-mongo
app.use(
  session({ secret: "keyboard cat", resave: false, saveUninitialized: false })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// --- Connect to MongoDB ---
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

connectDB();

// --- Define Routes ---
// This tells Express that any URL starting with /api/auth should use authRoutes
app.use("/api/auth", authRoutes);
// This tells Express that any URL starting with /api/protected should use protectedRoutes
app.use("/api/protected", protectedRoutes);
// This tells Express that any URL starting with /api/google should use googleAuthRoutes
app.use("/api/google", googleAuthRoutes);
// --- Start the Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
