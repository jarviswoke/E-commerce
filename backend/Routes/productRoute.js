const express = require('express');
const {
  createProduct,
  getProduct,
  getAllProducts,
  updateProduct,
  deleteProduct
} = require('../Controllers/productCtrl');
const { authMiddleware, isAdmin } = require('../Middlewares/authMiddleware');
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createProduct);

router.get("/", getAllProducts);
router.get("/:id", getProduct);

router.put("/:id", authMiddleware, isAdmin, updateProduct);
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);

module.exports = router;
