const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  createProductRivew,
  getAllProductReviews,
  deleteProductReviews,
} = require("../controller/product.controller");
const { userAuthentication, authorizeRoles } = require("../middelware/auth");

const router = express();
// router
//   .route("/")
//   .post(userAuthentication, authorizeRoles("admin"), createProduct).get(userAuthentication, authorizeRoles("admin"), getAllProducts);
router
  .route("/")
  .post( createProduct).get(getAllProducts);

// create product review
router.route("/review").put( userAuthentication,createProductRivew);

// product review get and delete
router.route('/reviews').get(getAllProductReviews).delete(userAuthentication,deleteProductReviews);


// router
//   .route("/:id")
//   .put(userAuthentication, authorizeRoles("admin"), updateProduct)
//   .delete(userAuthentication, authorizeRoles("admin"), deleteProduct)
//   .get(userAuthentication, authorizeRoles("admin"), getSingleProduct);

  router
  .route("/:id")
  .put(userAuthentication, authorizeRoles("admin"), updateProduct)
  .delete(userAuthentication, authorizeRoles("admin"), deleteProduct)
  .get(getSingleProduct);



module.exports = router;
