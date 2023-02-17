const express = require('express');
const router = express.Router();

const { createProduct, getAllProducts } = require('../controllers/productController');
const { updateProductImage, uploadProductImageCloud } = require('../controllers/uploadsController');

router.route('/').post(createProduct).get(getAllProducts);
router.route('/upload').post(uploadProductImageCloud);

module.exports = router;