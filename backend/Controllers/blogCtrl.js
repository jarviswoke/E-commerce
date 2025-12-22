const Blog = require("../Models/blogModel");
const User = require("../Models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../utlis/validateMongodbid");
 
// create blog
const createBlog = asyncHandler(async (req, res) => {
    const newBlog = await Blog.create(req.body);
    res.status(201).json(newBlog);
});

// update blog
const updateBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);

    const updatedBlog = await Blog.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
    );
    res.json(updatedBlog);
});

module.exports = { createBlog, updateBlog };