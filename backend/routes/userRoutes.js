const express = require("express");
const router = express.Router();
const {
 updateUser,
 deleteUser,
 getUsers
} = require("../controllers/userController");

router.route("/").get(getUsers)
router.route("/:id").put(updateUser).delete(deleteUser);


module.exports = router;
