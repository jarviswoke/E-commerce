const express = require('express');
const { authMiddleware, isAdmin } = require("../Middlewares/authMiddleware");
const { uploadPhoto, blogImgResize } = require("../Middlewares/uploadImg");
const { 
    createBlog,
    updateBlog,
    getBlog,
    getAllBlogs,
    likeBlog,
    dislikeBlog,
    uploadImages,
} = require('../Controllers/blogCtrl');
const router = express.Router();

router.post('/', authMiddleware, isAdmin, createBlog);

router.put('/likes', authMiddleware, isAdmin, likeBlog);
router.put('/dislikes', authMiddleware, isAdmin, dislikeBlog);

router.put(
  "/upload/:id",
  authMiddleware,
  isAdmin,
  uploadPhoto,
  blogImgResize, 
  uploadImages
);

router.put('/:id', authMiddleware, isAdmin, updateBlog);

router.get('/', getAllBlogs);
router.get('/:id', getBlog);

module.exports = router;