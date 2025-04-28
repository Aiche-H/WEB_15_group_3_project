// models/user.js (updated)
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  first_name: String,
  last_name: String,
  role: { type: String, enum: ['user', 'admin'], default: "user" },
  avatar: String,
  registration_date: { type: Date, default: Date.now },
  last_login: Date,
  last_activity: Date,
  email_verification: { type: Boolean, default: false },
  verification_token: String,
  joinDate: { type: Date, default: Date.now },
  lastLogin: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema, "users"); // Force collection 'users'

