const express = require("express");
const router = express.Router();
const {
 updateUser,
 deleteUser,
 getUsers,
 getUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleWare");

router.get("/", protect, getUsers);
router.get("/me", protect, getUser);
router.put("/", protect, updateUser);
router.put("/del", deleteUser);

module.exports = router;
