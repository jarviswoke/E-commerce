const Product = require("../Models/productModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

// create product route
const createProduct = asyncHandler(async (req, res) => {
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title, {
                lower: true,
                strict: true,
            });
        }
        const newProduct = await Product.create(req.body);
        res.status(201).json({
            success: true,
            message: "🛒 Avengers, assemble! A new product has entered the battlefield.",
            product: newProduct,
        });
    } catch (error) {
        throw new Error(error);
    }
});

// update product
const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title, {
                lower: true,
                strict: true,
            });
        }
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedProduct) {
            res.status(404);
            throw new Error("Product not found");
        }
        res.status(200).json({
            success: true,
            message: "⚡ Product updated — even Stark would approve.",
            product: updatedProduct,
        });
    } catch (error) {
        throw new Error(error);
    }
});

// get a product
const getProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
        res.status(404);
        throw new Error("This is not the product you are looking for 🛡️");
    }
    res.status(200).json({
        success: true,
        message: "Product retrieved. Avengers level access granted ⚡",
        product,
    });
});

// get all products
const getAllProducts = asyncHandler(async (req, res) => {
  try {
    // FILTERING
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach(el => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    let query = Product.find(JSON.parse(queryStr));

    // SORTING
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // FIELD LIMITING
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // PAGINATION
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Page validation (WITH FILTER)
    if (req.query.page) {
      const productCount = await Product.countDocuments(
        JSON.parse(queryStr)
      );
      if (skip >= productCount) {
        res.status(404);
        throw new Error("This page does not exist");
      }
    }

    query = query.skip(skip).limit(limit);
    const products = await query;
    res.status(200).json({
      success: true,
      count: products.length,
      page,
      products,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// delete product
const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            res.status(404);
            throw new Error("Product not found");
        }

        res.status(200).json({
            success: true,
            message: "🗑️ Product eliminated. Thanos would be proud.",
            product: deletedProduct,
        });
    } catch (error) {
        throw new Error(error);
    }
});


module.exports = { createProduct, getProduct, getAllProducts, updateProduct, deleteProduct };
