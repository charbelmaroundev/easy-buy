const catchAsyncErrors = require("../middlewares/catchAsyncErrors.middleware");
const Product = require("../models/product.model");
const ErrorHandler = require("../utils/ErrorHandler");

const createProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    const file = req.files[0];

    const imageUrl = file.filename;

    const productData = req.body;
    productData.image = imageUrl;

    const product = await Product.create(productData);

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

// get all products
const getAllProducts = catchAsyncErrors(async (req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.status(201).json({
      success: true,
      products,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

module.exports = { getAllProducts, createProduct };
