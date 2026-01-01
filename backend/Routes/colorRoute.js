const express = require("express");
const { authMiddleware, isAdmin } = require("../Middlewares/authMiddleware");
const {
  createColor,
  updateColor,
  deleteColor,
  getColor,
  getAllColors,
} = require("../Controllers/colorCtrl");

const router = express.Router();

// admin routes
router.post("/", authMiddleware, isAdmin, createColor);
router.put("/:id", authMiddleware, isAdmin, updateColor);
router.delete("/:id", authMiddleware, isAdmin, deleteColor);

// public routes
router.get("/:id", getColor);
router.get("/", getAllColors);

module.exports = router;
