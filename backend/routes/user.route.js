const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetpassword,
} = require("../controller/user.controller");
const router = express();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logoutUser);

router.route("/forgot-password").post(forgotPassword);

router.route("/reset-password/:token").put(resetpassword);

module.exports = router;
