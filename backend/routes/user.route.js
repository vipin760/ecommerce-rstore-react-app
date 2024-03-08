const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetpassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUser, 
  getSingleUser,
  deleteUser,
} = require("../controller/user.controller");
const { userAuthentication, authorizeRoles } = require("../middelware/auth");
const router = express();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route('/update-profile').post(userAuthentication,updateProfile);

router.route('/profile').get(userAuthentication,getUserDetails);

router.route("/logout").get(logoutUser);

router.route("/forgot-password").post(forgotPassword);

router.route("/reset-password/:token").put(resetpassword);

router.route('/update-password').post(userAuthentication,updatePassword);

router.route('/fetch').get(userAuthentication,authorizeRoles('admin'),getAllUser);

router.route('/fetch/:id').get(userAuthentication,authorizeRoles('admin'),getSingleUser).delete(userAuthentication,authorizeRoles("admin"),deleteUser);

module.exports = router;
