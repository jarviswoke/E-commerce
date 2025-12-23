const Blog = require("../Models/blogModel");
const User = require("../Models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongodbid");
 
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
    // validateMongodbId(id);
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

// get all blogs
const getAllBlogs = asyncHandler(async (req, res) => {
    const blogs = await Blog.find()
        .populate("likes")
        .populate("dislikes")
        .sort({ createdAt: -1 });

    res.json(blogs);
});

// like blog (NO :id in URL)
const likeBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body;

  // validation
  if (!blogId) {
    res.status(400);
    throw new Error("blogId is required in request body");
  }
  // validateMongodbId(blogId);
  const loginUserId = req.user._id;
  const blog = await Blog.findById(blogId);
  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }

  const alreadyLiked = blog.likes.find(
    (id) => id.toString() === loginUserId.toString()
  );
  const alreadyDisliked = blog.dislikes.find(
    (id) => id.toString() === loginUserId.toString()
  );

  // remove dislike → add like
  if (alreadyDisliked) {
    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: loginUserId },
        $push: { likes: loginUserId },
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
      $push: { likes: loginUserId },
      isLiked: true,
    },
    { new: true }
  );
  res.json(updatedBlog);
});


module.exports = { createBlog, updateBlog, getBlog, getAllBlogs, likeBlog};