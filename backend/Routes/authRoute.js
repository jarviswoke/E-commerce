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
    updatePassword,
    forgotPasswordToken,
    resetPassword,
} = require("../Controllers/userCtrl");

const { authMiddleware, isAdmin } = require('../Middlewares/authMiddleware');
const router = express.Router();

// Public routes
router.post("/register", createUser);
router.post("/login", loginUserCtrl);
router.post("/refresh", handleRefreshToken);
router.post("/forgot-password-token", forgotPasswordToken);

// protected routes
router.post("/logout", authMiddleware, logout);
router.put("/update-password", authMiddleware, updatePassword);
router.put("/edit-user/:id", authMiddleware, updateUser);

// admin routes
router.get("/all-users", authMiddleware, isAdmin, getallUser);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);
router.delete("/:id", authMiddleware, isAdmin, deleteUser);

router.put("/reset-password/:token", resetPassword);
router.get("/:id", authMiddleware, getaUser);

module.exports = router;
