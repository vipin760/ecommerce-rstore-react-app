const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
} = require("../controller/product.controller");
const { userAuthentication, authorizeRoles } = require("../middelware/auth");

const router = express();

router
  .route("/")
  .post(userAuthentication, authorizeRoles("admin"), createProduct);

router
  .route("/")
  .get(userAuthentication, authorizeRoles("admin"), getAllProducts);

router
  .route("/:id")
  .put(userAuthentication, authorizeRoles("admin"), updateProduct)
  .delete(userAuthentication, authorizeRoles("admin"), deleteProduct)
  .get(getSingleProduct);

module.exports = router;
