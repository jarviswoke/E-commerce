const express = require('express');
const { authMiddleware, isAdmin } = require("../Middlewares/authMiddleware");
const { 
    createBlog,
    updateBlog,
    getBlog,
    getAllBlogs,
    likeBlog,
    dislikeBlog,
} = require('../Controllers/blogCtrl');
const router = express.Router();

router.post('/', authMiddleware, isAdmin, createBlog);

router.put('/likes', authMiddleware, isAdmin, likeBlog);
router.put('/dislikes', authMiddleware, isAdmin, dislikeBlog);

router.put('/:id', authMiddleware, isAdmin, updateBlog);

router.get('/', getAllBlogs);
router.get('/:id', getBlog);

module.exports = router;