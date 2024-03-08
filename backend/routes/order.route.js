const express = require("express");
const { userAuthentication, authorizeRoles } = require("../middelware/auth");
const {
  newOrder,
  getSignleOrder,
  myOrder,
  getAllOrders,
  updateOrders,
  deleteOrder,
} = require("../controller/order.controller");
const router = express();

router.route("/create-order").post(userAuthentication, newOrder);

router.route("/me").get(userAuthentication, myOrder);

// admin get all orders
router
  .route("/")
  .get(userAuthentication, authorizeRoles("admin"), getAllOrders);

router
  .route("/:id")
  .get(userAuthentication, authorizeRoles("admin"), getSignleOrder)
  .put(userAuthentication, authorizeRoles("admin"), updateOrders)
  .delete(userAuthentication, authorizeRoles("admin"), deleteOrder);

module.exports = router;
