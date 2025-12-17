const User = require('../Models/userModel');
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async (req, res, next) => {
    let token;
    if ( req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Find user and attach to request
            const user = await User.findById(decoded.id).select("-password");
            if (!user) {
                res.status(401);
                throw new Error("User not found");
            }
            req.user = user; 
            next(); 
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    } else {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});

const isAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        res.status(403);
        throw new Error("Admin access only");
    }
    next();
};

module.exports = { authMiddleware, isAdmin };