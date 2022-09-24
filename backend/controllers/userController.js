const asyncHandler = require("express-async-handler");

const { User } = require("../models/userModel");

// @desc    Get userS
// @route   GET /api/user
// @access  Private
const getUsers = asyncHandler(async (req, res) => {
 const users = await User.find();
 res.status(200).json(users);
});

// @desc    Update user
// @route   PUT /api/user/:id
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
 const user = await User.findById(req.params.id)

 if (!user) {
  res.status(400)
  throw new Error('User not found')
 }

 const updateUser = await User.findByIdAndUpdate(req.params.id, req.body)

 res.status(200).json(updateUser);
});

// @desc    Delete userd
// @route   DELETE /api/user/:id
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {

 const user = await User.findById(req.params.id)

 if (!user) {
  res.status(400)
  throw new Error('User not found')
 }

 const deleteUser = await User.findByIdAndDelete(req.params.id)

 res.status(200).json(deleteUser);
});

module.exports = {
 updateUser,
 deleteUser,
 getUsers,
};
