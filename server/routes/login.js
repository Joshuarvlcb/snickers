const express = require("express");
const router = express.Router();
const { login, register, getProfile } = require("../controllers/auth");

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/").post(getProfile);

module.exports = router;
