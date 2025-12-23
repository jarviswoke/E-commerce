const express = require("express");
const { authMiddleware, isAdmin } = require("../Middlewares/authMiddleware");
const {
    createCategory,
    updateCategory,
    deleteCategory,
    getCategory,
    getAllCategories,
} = require("../Controllers/ProdcategoryCtrl");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createCategory);
router.put("/:id", authMiddleware, isAdmin, updateCategory);
router.delete("/:id", authMiddleware, isAdmin, deleteCategory);

router.get("/:id", authMiddleware, getCategory);        
router.get("/", authMiddleware, isAdmin, getAllCategories); 

module.exports = router; 