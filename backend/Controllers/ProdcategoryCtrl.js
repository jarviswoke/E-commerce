const Category = require("../Models/ProdcategoryModel");
const User = require("../Models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongodbid");

const createCategory = asyncHandler(async (req, res) => {
    try {
        const newCategory = await Category.create(req.body);
        res.json(newCategory);
    } catch (error) {
        throw new Error(error);
    }
});

// update category
const updateCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );
        if (!updatedCategory) {
            res.status(404);
            throw new Error("Category not found");
        }
        res.json(updatedCategory);
    } catch (error) {
        throw new Error(error);
    }
});

// delete category
const deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
        const deletedCategory = await Category.findByIdAndDelete(id);
        if (!deletedCategory) {
            res.status(404);
            throw new Error("Category not found");
        }
        res.json({
            message: "Category deleted successfully",
            deletedCategory,
        });
    } catch (error) {
        throw new Error(error);
    }
});

// get single category
const getCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    const category = await Category.findById(id);
    if (!category) {
        res.status(404);
        throw new Error("Category not found");
    }
    res.json(category);
});

// get all categories
const getAllCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find();
    res.json(categories);
});



module.exports = { createCategory, updateCategory, deleteCategory, getCategory, getAllCategories};