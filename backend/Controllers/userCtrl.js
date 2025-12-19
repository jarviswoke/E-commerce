const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../Config/jwtToken");
const User = require("../Models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../utlis/validateMongodbid");
const { generateRefreshToken } = require("../Config/refreshToken");

// create user
const createUser = asyncHandler(async (req, res) => {
    const { email } = req.body;
    // Check if user already exists
    const findUser = await User.findOne({ email });
    if (findUser) {
        res.status(409);
        throw new Error("This hero already exists in the Avengers database..");
    }
    // Create new user
    const newUser = await User.create(req.body);
    res.status(201).json({
        success: true,
        message: "Welcome to the Avengers Initiative..",
        data: newUser,
    });
});

// login user
const loginUserCtrl = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    //check if user exist
    const findUser = await User.findOne({ email }).select("+password");
    if(findUser && await findUser.isPasswordMatched(password)) {
        const refreshToken = await generateRefreshToken(findUser._id);
        // save refreshtoken in db
        await User.findByIdAndUpdate(
            findUser.id,
            { refreshToken },
            {  new: true }
        );
        // set refresh token in cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,      
            sameSite: "lax",
            maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
        });

        res.json({
            message: "Access granted. Suit up, Avenger!!",
            _id: findUser?._id,
            firstname: findUser?.firstname,
            lastname: findUser?.lastname,
            email: findUser?.email,
            mobile: findUser?.mobile,
            token: generateToken(findUser?._id),
        });
    } else {
        res.status(401);
        throw new Error('Access denied. Even Tony Stark needs the right credentials...');
    }
});

// handle refresh token 
const handleRefreshToken = asyncHandler(async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.refreshToken) {
        return res.status(401).json({ message: "No Time Stone found. Refresh token missing(cookies)" });
    }
    const refreshToken = cookies.refreshToken;

    // find user with this refresh token
    const user = await User.findOne({ refreshToken });
    if (!user) {
        return res.status(403).json({ message: "Nick Fury doesnt recognize this token.." });
    }

    // verify refresh token
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err || user._id.toString() !== decoded.id) {
            return res.status(403).json({ message: " Thanos snapped this refresh token out of existence." });
        }

        // generate NEW access token
        const accessToken = generateToken(user._id);
        res.status(200).json({
            message: "Time reset successful. New access token forged..",
            accessToken,
        });
    });
});

// logout functionality
const logout = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.refreshToken) {
    return res.sendStatus(204); 
  }
  const refreshToken = cookies.refreshToken;
  const user = await User.findOne({ refreshToken });

  // Clear cookie anyway
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  if (!user) {
    return res.sendStatus(204);
  }
  user.refreshToken = "";
  await user.save();
  return res.status(200).json({ 
    message: "Youve exited the Avengers Tower safely.." 
    });
});


// Update user
const updateUser = asyncHandler(async (req, res) => {
    console.log();
    const { id } = req.params;
    const { _id, role } = req.user;

    validateMongodbId(_id);
    validateMongodbId(id);

    // authorization check
    if (req.user.role !== "admin" && req.user._id.toString() !== id) {
        res.status(403);
        throw new Error(" You cant edit another Avengers suit..");
    }
    const updatedUser = await User.findByIdAndUpdate(
        id,
        {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            mobile: req.body.mobile,
        },
        {
            new: true,
            runValidators: true,
        }
    );
    if (!updatedUser) {
        res.status(404);
        throw new Error(" SHIELD couldnt locate this Avenger..");
    }
    res.status(200).json({
        message: "Profile upgraded. Stark would be proud..",
        updatedUser,
    });
});

//Get all users
const getallUser = asyncHandler(async (req, res) => {
    try {
        const getUsers = await User.find();
        res.json(getUsers);
    } catch (error) {
        throw new Error(error);
    }
});

// Get a single user
const getaUser = asyncHandler(async (req, res) => {
    const { id } = req.params;

    //validate MongoDB ObjectId
    validateMongodbId(id);
    const user = await User.findById(id);
    if (!user) {
        res.status(404);
        throw new Error("This Avenger is off the grid..");
    }
    res.status(200).json(user);
});

// Delete a user
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Validate MongoDB ObjectId
    validateMongodbId(id);

    const user = await User.findByIdAndDelete(id);
    if (!user) {
        res.status(404);
        throw new Error("Target not found in the multiverse..");
    }
    res.status(200).json({
        message: "Avenger removed from the multiverse..",
        deletedUser: user,
    });
});

// block user
const blockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);

    const user = await User.findByIdAndUpdate(
        id,
        { isBlocked: true },
        { new: true }
    );
    if (!user) {
        res.status(404);
        throw new Error("SHIELD failed to detain this Avenger!!");
    }
    res.json({
        message: "This Avenger has been detained by SHIELD...",
        user,
    });
});

//unblock user
const unblockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);

    const user = await User.findByIdAndUpdate(
        id,
        { isBlocked: false },
        { new: true }
    );
    if (!user) {
        res.status(404);
        throw new Error(" This Avenger cannot be found for release..");
    }
    res.json({
        message: " This Avenger cannot be found for release..",
        user,
    });
});


module.exports = { createUser, loginUserCtrl, updateUser, getallUser, getaUser, deleteUser, blockUser, unblockUser, handleRefreshToken, logout };
