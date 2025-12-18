const express = require('express');
const {
    createUser,
    loginUserCtrl,
    getallUser, 
    getaUser,
    deleteUser,
    updateUser,
    blockUser,
    unblockUser,
} = require("../Controllers/userCtrl");

const { authMiddleware, isAdmin } = require('../Middlewares/authMiddleware');
const router = express.Router();

// Public routes
router.post("/register", createUser);
router.post("/login", loginUserCtrl);

// Protected routes
router.get("/all-users", authMiddleware, isAdmin, getallUser);
router.get("/:id", authMiddleware, getaUser);
router.put("/edit-user", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, isAdmin, deleteUser);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);

module.exports = router;
