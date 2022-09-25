const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const { User } = require("../models/userModel");

// @desc    Set user
// @route   POST /api/user
// @access  Private
const setUser = asyncHandler(async (req, res) => {
 let { first_name, last_name, email, password } = req.body;

 if (!first_name || !last_name || !email || !password) {
  res.status(400);
  throw new Error("Please fill all fields");
 }

 const date = () => {
  let d = new Date();
  return `${d.getDate()}-${d.getMonth()}-${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
 };

 // Check if user exist
 const userExists = await User.findOne({ email });

 if (userExists) {
  res.status(400);
  throw new Error("User already exists");
 }

 // Hash password
 const salt = await bcrypt.genSalt(10);
 const hashedPassword = await bcrypt.hash(password, salt);

 // Create user
 const user = await User.create({
  first_name,
  last_name,
  email,
  password: hashedPassword,
  last_login: date(),
  register_date: date(),
 });

 if (user) {
  res.status(201).json({
   _id: user.id,
   name: `${user.first_name} ${user.last_name}`,
   email: user.email,
   token: generateToken(user._id),
  });
 } else {
  res.status(400);
  throw new Error("Incalid user data");
 }
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Private
const login = asyncHandler(async (req, res) => {
 const { email, password } = req.body;
 const date = () => {
  let d = new Date();
  return `${d.getDate()}-${d.getMonth()}-${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
 };
 // Check for user email
 const user = await User.findOne({ email });

 if (user && (await bcrypt.compare(password, user.password))) {
  if (!user.status) {
   res.status(403);
   throw new Error("You are blocked");
  }
  await User.findOneAndUpdate({ email }, { last_login: date() });
  res.json({
   _id: user.id,
   name: user.first_name,
   email: user.email,
   token: generateToken(user._id),
  });
 } else {
  res.status(400);
  throw new Error("Invalid credentionals");
 }
});

// Generate Toekn
const generateToken = (id) => {
 return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

module.exports = {
 login,
 setUser,
};
