const express = require('express');
const {
    createUser,
    loginUserCtrl,
    loginAdminCtrl,
    saveAddress,
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
    getWishlist,
    userCart,
    getUserCart,
    emptyCart,
    applyCoupon,
    createOrder,
} = require("../Controllers/userCtrl");

const { authMiddleware, isAdmin } = require('../Middlewares/authMiddleware');
const router = express.Router();

// Public routes
router.post("/register", createUser);
router.post("/login", loginUserCtrl);
router.post("/admin-login", loginAdminCtrl);
router.post("/refresh", handleRefreshToken);
router.post("/forgot-password-token", forgotPasswordToken);

// protected routes
router.post("/logout", authMiddleware, logout);
router.put("/update-password", authMiddleware, updatePassword);
router.put("/edit-user/:id", authMiddleware, updateUser);
router.put("/save-address", authMiddleware, saveAddress);

router.get("/wishlist", authMiddleware, getWishlist);
router.post("/cart", authMiddleware, userCart);
router.get("/cart", authMiddleware, getUserCart);     
router.delete("/cart", authMiddleware, emptyCart); 
router.post("/cart/apply-coupon", authMiddleware, applyCoupon);


// admin routes
router.get("/all-users", authMiddleware, isAdmin, getallUser);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);
router.delete("/:id", authMiddleware, isAdmin, deleteUser);

router.put("/reset-password/:token", resetPassword);
router.get("/:id", authMiddleware, getaUser);

module.exports = router;
