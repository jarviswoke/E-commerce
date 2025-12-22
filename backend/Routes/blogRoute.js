const express = require('express');
const { authMiddleware, isAdmin } = require("../Middlewares/authMiddleware");
const { createBlog, updateBlog } = require('../Controllers/blogCtrl');
const router = express.Router();

router.post('/', authMiddleware, isAdmin, createBlog);
router.put('/:id', authMiddleware, isAdmin, updateBlog );

module.exports = router;