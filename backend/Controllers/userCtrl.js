const mongoose = require("mongoose");
const { generateToken } = require("../Config/jwtToken");
const User = require("../Models/userModel");
const asyncHandler = require("express-async-handler");

// create user
const createUser = asyncHandler(async (req, res) => {
    const { email } = req.body;
    // Check if user already exists
    const findUser = await User.findOne({ email });
    if (findUser) {
        res.status(409);
        throw new Error("User already exists");
    }
    // Create new user
    const newUser = await User.create(req.body);
    res.status(201).json({
        success: true,
        data: newUser,
    });
});

// login user
const loginUserCtrl = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    //check if user exist
    const findUser = await User.findOne({ email }).select("+password");
    if(findUser && await findUser.isPasswordMatched(password)) {
        res.json({
            _id: findUser?._id,
            firstname: findUser?.firstname,
            lastname: findUser?.lastname,
            email: findUser?.email,
            mobile: findUser?.mobile,
            token: generateToken(findUser?._id),
        });
    } else {
        res.status(401);
        throw new Error('Invlalid Credentials...');
    }
});

// Update user
const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400);
        throw new Error("Invalid user ID");
    }
    // authorization check
    if (req.user.role !== "admin" && req.user._id.toString() !== id) {
        res.status(403);
        throw new Error("You can update only your own profile");
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
        throw new Error("User not found...");
    }
    res.status(200).json(updatedUser);
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
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400);
        throw new Error("Invalid user ID");
    }
    const user = await User.findById(id);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    res.status(200).json(user);
});

// Delete a user
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400);
        throw new Error("Invalid user ID");
    }
    const user = await User.findByIdAndDelete(id);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    res.status(200).json({
        message: "User deleted successfully",
        deletedUser: user,
    });
});

module.exports = { createUser, loginUserCtrl, updateUser, getallUser, getaUser, deleteUser };
