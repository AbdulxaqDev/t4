const asyncHandler = require("express-async-handler");

const { User } = require("../models/userModel");

// @desc    Get userS
// @route   GET /api/user
// @access  Private
const getUsers = asyncHandler(async (req, res) => {
 const users = await User.find();
 res.status(200).json(users);
});

// @desc    Get userS
// @route   GET /api/user
// @access  Private
const getUser = asyncHandler(async (req, res) => {
 const users = await User.findById(req.user.id);
 res.status(200).json(users);
});

// @desc    Update user
// @route   PUT /api/user/:id
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
 let { IDs, status } = req.body;
 let ids = IDs;
 const updateUsers = await User.updateMany(
  { _id: { $in: ids } },
  { $set: { status } },
  { multi: true }
 );

 if (updateUsers) {
  res.status(201).json(updateUsers);
 } else {
  res.status(500);
  throw new Error("Error on updating users status");
 }
});

// @desc    Delete userd
// @route   DELETE /api/user/:id
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
 let { IDs } = req.body;
 const deleteUser = await User.deleteMany({ _id: { $in: IDs } });
 console.log(req.body);
 if (deleteUser) {
  res.status(201).json(deleteUser);
 } else {
  res.status(500);
  throw new Error("Error on updating users status");
 }
});

module.exports = {
 updateUser,
 deleteUser,
 getUsers,
 getUser,
};
