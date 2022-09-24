const asyncHandler = require("express-async-handler");

// @desc    Get user
// @route   GET /api/user
// @access  Private
const getUser = asyncHandler(async (req, res) => {
 res.status(200).json({ message: "Get the user" });
});

// @desc    Set user
// @route   POST /api/user
// @access  Private
const setUser = asyncHandler(async (req, res) => {
 if (!req.body.text) {
  res.status(400);
  throw new Error("No Text");
 }

 res.status(200).json({ message: "Set the user" });
});

// @desc    Update user
// @route   PUT /api/user/:id
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
 res.status(200).json({ message: `Update the user, id: ${req.params.id}` });
});

// @desc    Delete userd
// @route   DELETE /api/user/:id
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
 res.status(200).json({ message: `Delete the user, id: ${req.params.id}` });
});

module.exports = {
 getUser,
 setUser,
 updateUser,
 deleteUser,
};
