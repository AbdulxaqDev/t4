const express = require("express");
const router = express.Router();
const {login, setUser} = require("../controllers/authController");

router.post("/login", login)
router.post("/register", setUser)

module.exports = router;
