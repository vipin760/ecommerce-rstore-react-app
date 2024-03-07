const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetpassword,
  getUserDetails,
} = require("../controller/user.controller");
const { userAuthentication } = require("../middelware/auth");
const router = express();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logoutUser);

router.route("/forgot-password").post(forgotPassword);

router.route("/reset-password/:token").put(resetpassword);

router.route('/profile').get(userAuthentication,getUserDetails)

module.exports = router;
