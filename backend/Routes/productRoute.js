const express = require('express');
const {
  createProduct,
  getProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  addToWishlist,
  rating,
  uploadImages
} = require('../Controllers/productCtrl');
const { authMiddleware, isAdmin } = require('../Middlewares/authMiddleware');
const { uploadPhoto, productImgResize } = require("../Middlewares/uploadImg");
const router = express.Router();

router.put("/wishlist", authMiddleware, addToWishlist);
router.put("/rating", authMiddleware, rating);

router.post("/", authMiddleware, isAdmin, createProduct);
router.get("/", getAllProducts);

router.put(
  "/upload/:id",
  authMiddleware,
  isAdmin,
  uploadPhoto,
  uploadImages,
  (req, res) => {
    console.log(req.files); // shows destination, path, filename
    res.json({ success: true, files: req.files });
  }
);

router.get("/:id", authMiddleware, isAdmin, getProduct);
router.put("/:id", authMiddleware, isAdmin, updateProduct);
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);

module.exports = router;
