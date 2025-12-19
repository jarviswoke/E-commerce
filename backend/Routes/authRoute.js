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
    handleRefreshToken,
    logout,
} = require("../Controllers/userCtrl");

const { authMiddleware, isAdmin } = require('../Middlewares/authMiddleware');
const router = express.Router();

// Public routes
router.post("/register", createUser);
router.post("/login", loginUserCtrl);
router.post("/refresh", handleRefreshToken );
router.post("/logout", logout );

// Protected routes
router.get("/all-users", authMiddleware, isAdmin, getallUser);
router.put("/edit-user", authMiddleware, updateUser);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);
router.get("/:id", authMiddleware, getaUser);
router.delete("/:id", authMiddleware, isAdmin, deleteUser);

module.exports = router;
