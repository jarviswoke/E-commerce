const express = require("express");
const { authMiddleware, isAdmin } = require("../Middlewares/authMiddleware");
const {
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
  getEnquiry,
  getAllEnquiries,
} = require("../Controllers/enqCtrl");
const router = express.Router();
 
router.post("/", createEnquiry);
router.put("/:id", authMiddleware, isAdmin, updateEnquiry);
router.delete("/:id", authMiddleware, isAdmin, deleteEnquiry);
router.get("/:id", authMiddleware, isAdmin, getEnquiry);
router.get("/", authMiddleware, isAdmin, getAllEnquiries);

module.exports = router;
