import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: function () {
      return !this.googleId;
    }, // Required if not Google authenticated
    unique: true,
    sparse: true, // Allows multiple null values
  },
  email: {
    type: String,
    required: function () {
      return !this.googleId;
    }, // Required if not Google authenticated
    unique: true,
    sparse: true,
  },
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: function () {
      return !this.googleId;
    }, // Required if not Google authenticated
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true, // Allows multiple null values for non-Google users
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// The key is to create the model from the schema
const User = mongoose.model("user", UserSchema);

// And then export it as the default
export default User;
