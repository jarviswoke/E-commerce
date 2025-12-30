const Blog = require("../Models/blogModel");
const User = require("../Models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongodbid");
const cloudinaryUploadImg = require("../utils/cloudinary");
const fs = require("fs");


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


// get single blog
const getBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  const blog = await Blog.findByIdAndUpdate(
    id,
    { $inc: { numViews: 1 } },
    { new: true }
  )
    .populate("likes")
    .populate("dislikes");

  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }
  res.json(blog);
});


// get all blog
const getAllBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find()
    .populate("likes")
    .populate("dislikes")
    .sort({ createdAt: -1 });

  res.json(blogs);
});


// like blog
const likeBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body;
  validateMongodbId(blogId);
  const loginUserId = req.user._id;
  const blog = await Blog.findById(blogId);
  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }
  const alreadyLiked = blog.likes.includes(loginUserId);
  const alreadyDisliked = blog.dislikes.includes(loginUserId);
  // remove dislike → add like
  if (alreadyDisliked) {
    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: loginUserId },
        $addToSet: { likes: loginUserId },
        isLiked: true,
        isDisliked: false,
      },
      { new: true }
    );
    return res.json(updatedBlog);
  }
  // unlike
  if (alreadyLiked) {
    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );
    return res.json(updatedBlog);
  }
  // like
  const updatedBlog = await Blog.findByIdAndUpdate(
    blogId,
    {
      $addToSet: { likes: loginUserId },
      isLiked: true,
    },
    { new: true }
  );
  res.json(updatedBlog);
});


// dilike blog
const dislikeBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body;
  validateMongodbId(blogId);
  const loginUserId = req.user._id;
  const blog = await Blog.findById(blogId);
  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }
  const alreadyLiked = blog.likes.includes(loginUserId);
  const alreadyDisliked = blog.dislikes.includes(loginUserId);
  // remove like → add dislike
  if (alreadyLiked) {
    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: loginUserId },
        $addToSet: { dislikes: loginUserId },
        isLiked: false,
        isDisliked: true,
      },
      { new: true }
    );
    return res.json(updatedBlog);
  }
  // undislike
  if (alreadyDisliked) {
    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: loginUserId },
        isDisliked: false,
      },
      { new: true }
    );
    return res.json(updatedBlog);
  }
  // dislike
  const updatedBlog = await Blog.findByIdAndUpdate(
    blogId,
    {
      $addToSet: { dislikes: loginUserId },
      isDisliked: true,
    },
    { new: true }
  );

  res.json(updatedBlog);
});

// upload images
const uploadImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  if (!req.files || req.files.length === 0) {
    throw new Error("No images uploaded");
  }
  await Blog.updateOne(
    { _id: id, images: { $type: "string" } },
    { $set: { images: [] } }
  );
  const urls = [];
  for (const file of req.files) {
    const uploaded = await cloudinaryUploadImg(file.path, "blogs");
    urls.push(uploaded);
    fs.unlinkSync(file.path);
  }
  const blog = await Blog.findByIdAndUpdate(
    id,
    { $push: { images: { $each: urls } } },
    { new: true }
  );
  res.json(blog);
});



module.exports = { createBlog, updateBlog, getBlog, getAllBlogs, likeBlog,dislikeBlog, uploadImages, };
