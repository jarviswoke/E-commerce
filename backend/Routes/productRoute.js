const express = require('express');
const {
  createProduct,
  getProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  addToWishlist,
} = require('../Controllers/productCtrl');
const { authMiddleware, isAdmin } = require('../Middlewares/authMiddleware');
const router = express.Router();

router.put("/wishlist", authMiddleware, addToWishlist);
router.post("/", authMiddleware, isAdmin, createProduct);
router.get("/", getAllProducts);

router.get("/:id", authMiddleware, isAdmin, getProduct);
router.put("/:id", authMiddleware, isAdmin, updateProduct);
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);


module.exports = router;
