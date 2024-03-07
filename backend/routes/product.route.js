const express = require('express');
const { getAllProducts,createProduct, updateProduct, deleteProduct, getSingleProduct } = require('../controller/product.controller');

const router = express()

router.route('/create-product').post(createProduct);

router.route('/product').get(getAllProducts);

router.route('/product/:id').put(updateProduct).delete(deleteProduct).get(getSingleProduct);


module.exports = router