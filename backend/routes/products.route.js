const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  createProduct,
} = require("../controllers/product.controller");
const { upload } = require("../multer");

router.get("/get-all-products", getAllProducts);

// Insert product
// router.post("/create-product", upload.array("image"), createProduct);

module.exports = router;
