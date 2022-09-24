const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
 {
  first_name: {
   type: String,
   required: [true, "Add your first-name"],
  },
  last_name: {
   type: String,
   required: [true, "Add your last-name"],
  },
  email: {
   type: String,
   required: [true, "Add your email"],
  },
  password: {
   type: String,
   required: [true, "Add password"],
  },
  last_login: {
   type: String,
  },
  register_date: {
   type: String,
  },
  status: {
   type: Boolean,
   default: true,
  },
 }
);

const userLoginSchema = mongoose.Schema({
 email: {
  type: String,
  required: [true, "Enter your email"],
 },
 password: {
  type: String,
  required: [true, "Enter your password"],
 },
});

module.exports = {
 User: mongoose.model("User", userSchema),
 UserLogin: mongoose.model("UserLogin", userLoginSchema),
};
