const BlogCategory = require("../Models/BlogcatModel");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongodbid");

// CREATE blog category
const createBlogCategory = asyncHandler(async (req, res) => {
    const newCategory = await BlogCategory.create(req.body);
    res.status(201).json(newCategory);
});

// UPDATE blog category
const updateBlogCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);

    const updatedCategory = await BlogCategory.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
    );

    if (!updatedCategory) {
        res.status(404);
        throw new Error("Blog category not found");
    }

    res.json(updatedCategory);
});

// DELETE blog category
const deleteBlogCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);

    const deletedCategory = await BlogCategory.findByIdAndDelete(id);

    if (!deletedCategory) {
        res.status(404);
        throw new Error("Blog category not found");
    }

    res.json({
        message: "Blog category deleted successfully",
        deletedCategory,
    });
});

// GET single blog category
const getBlogCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);

    const category = await BlogCategory.findById(id);

    if (!category) {
        res.status(404);
        throw new Error("Blog category not found");
    }

    res.json(category);
});

// GET all blog categories
const getAllBlogCategories = asyncHandler(async (req, res) => {
    const categories = await BlogCategory.find();
    res.json(categories);
});

module.exports = {
    createBlogCategory,
    updateBlogCategory,
    deleteBlogCategory,
    getBlogCategory,
    getAllBlogCategories,
};
