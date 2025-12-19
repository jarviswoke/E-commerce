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
    const products = await Product.find();

    res.status(200).json({
        success: true,
        message: "All products assembled. Avengers, roll out 🦾",
        products,
        count: products.length,
    });
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
