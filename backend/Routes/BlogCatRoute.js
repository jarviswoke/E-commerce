const express = require("express");
const { authMiddleware, isAdmin } = require("../Middlewares/authMiddleware");
const {
    createBlogCategory,
    updateBlogCategory,
    deleteBlogCategory,
    getBlogCategory,
    getAllBlogCategories,
} = require("../Controllers/blogCatCtrl");
const { create } = require("../Models/userModel");

const router = express.Router();

router.post("/", authMiddleware, isAdmin, createBlogCategory);
router.put("/:id", authMiddleware, isAdmin, updateBlogCategory);
router.delete("/:id", authMiddleware, isAdmin, deleteBlogCategory);

router.get("/:id", getBlogCategory);
router.get("/", authMiddleware, isAdmin, getAllBlogCategories);

module.exports = router;
