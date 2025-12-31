const jwt = require("jsonwebtoken");
const { generateToken } = require("../Config/jwtToken");
const User = require("../Models/userModel");
const Product = require("../Models/productModel");
const Cart = require("../Models/cartModel");
const Coupon = require("../Models/couponModel");
const Order = require("../Models/couponModel");

const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongodbid");
const { generateRefreshToken } = require("../Config/refreshToken");
const sendEmail = require("./emailCtrl");
const crypto = require("crypto");

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
  // Remove password from response (extra safety)
  const userObj = newUser.toObject();
  delete userObj.password;
  res.status(201).json({
    success: true,
    message: "Welcome to the Avengers Initiative..",
    data: userObj,
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

// login admin
const loginAdminCtrl = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const findAdmin = await User.findOne({ email }).select("+password");
    if (
        findAdmin &&
        await findAdmin.isPasswordMatched(password) &&
        findAdmin.role === "admin"
    ) {
        const refreshToken = await generateRefreshToken(findAdmin._id);
        await User.findByIdAndUpdate(
            findAdmin._id,
            { refreshToken },
            { new: true }
        );
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 3 * 24 * 60 * 60 * 1000,
        });
        res.status(200).json({
            message: "Welcome back, Director of SHIELD",
            _id: findAdmin._id,
            firstname: findAdmin.firstname,
            lastname: findAdmin.lastname,
            email: findAdmin.email,
            role: findAdmin.role,
            token: generateToken(findAdmin._id),
        });
    } else {
        res.status(403);
        throw new Error("Not authorized as admin");
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


// save user address
const saveAddress = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongodbId(_id);
    const updatedUser = await User.findByIdAndUpdate(
        _id,
        {
            address: req.body.address,
        },
        {
            new: true,
        }
    );
    if (!updatedUser) {
        res.status(404);
        throw new Error("User not found");
    }
    res.status(200).json({
        message: "Address saved successfully...",
        user: updatedUser,
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

// update password
const updatePassword = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { password } = req.body;
    validateMongodbId(_id);
    const user = await User.findById(_id);
    if (!user) {
        throw new Error("🛑 Identity not found in the multiverse");
    }
    if (!password) {
        throw new Error("⚠️ You can't suit up without a password");
    }
    user.password = password;
    await user.save();
    res.status(200).json({
        status: "SUCCESS",
        title: "🦸‍♂️ Operation Password Upgrade",
        message: "New suit deployed successfully. Welcome to your next phase.",
    });
});

// forgot password token
const forgotPasswordToken = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("User not found with this email");
    }
    try {
        const token = await user.createPasswordResetToken();
        // Save token & expiry in DB
        await user.save({ validateBeforeSave: false });

        // Email reset link
        const resetURL = `<p>Hi,</p><p>Follow this link to reset your password.</p>
            <p>This link is valid for <b>10 minutes</b>.</p>
            <a href="http://localhost:3000/reset-password/${token}">Click Here to Reset Password</a>`;
        const data = {
            to: email,
            subject: "Forgot Password Link",
            text: "Reset your password",
            html: resetURL,
        };
        await sendEmail(data);
        res.json({
            message: "Password reset link sent to your email",
        });
    } catch (error) {
        throw new Error(error.message);
    }
});

// reset  password
const resetPassword = asyncHandler(async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    if (!password) {
        throw new Error("Password is required");
    }
    const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

    // Find user with valid token
    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
        throw new Error("Reset token is invalid or expired");
    }
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    res.status(200).json({
        status: "SUCCESS",
        message: "Password reset successful. You can now login 🦸‍♂️",
    });
});

// get user wishlist
const getWishlist = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongodbId(_id);
    const user = await User.findById(_id).populate("wishlist");
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    res.status(200).json({
        message: "Wishlist fetched successfully...",
        wishlist: user.wishlist,
    });
});

// user cart
const userCart = asyncHandler(async (req, res) => {
  const { cart } = req.body;
  const { _id } = req.user;
  validateMongodbId(_id);
  // Remove existing cart
  await Cart.findOneAndDelete({ orderby: _id });
  let products = [];
  let cartTotal = 0;
  for (let i = 0; i < cart.length; i++) {
    const productFromDB = await Product.findById(cart[i]._id)
      .select("price")
      .exec();

    if (!productFromDB) {
      throw new Error("Product not found");
    }
    let object = {
      product: cart[i]._id,
      count: cart[i].count,
      color: cart[i].color,
      price: productFromDB.price,
    };
    cartTotal += productFromDB.price * cart[i].count;
    products.push(object);
  }
  // Create new cart
  const newCart = await Cart.create({
    products,
    cartTotal,
    orderby: _id,
  });
  res.json(newCart);
});

// get user cart 
const getUserCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongodbId(_id);
  const cart = await Cart.findOne({ orderby: _id })
    .populate("products.product")
    .exec();
  if (!cart) {
    return res.json({
      products: [],
      cartTotal: 0,
      totalAfterDiscount: 0,
    });
  }
  res.json(cart);
});

// empty cart 
const emptyCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongodbId(_id);
  const cart = await Cart.findOneAndDelete({ orderby: _id });
  if (!cart) {
    return res.json({ message: "Cart already empty" });
  }
  res.json({ message: "Cart emptied successfully" });
});

// apply coupon
const applyCoupon = asyncHandler(async (req, res) => {
  const { coupon } = req.body;
  const { _id } = req.user;
  validateMongodbId(_id);
  // Find coupon
  const validCoupon = await Coupon.findOne({ 
    name: coupon.toUpperCase(),
    isActive: true,
   });
  if (!validCoupon) {
    throw new Error("Invalid coupon");
  }
  // Check expiry
  if (validCoupon.expiry < new Date()) {
    throw new Error("Coupon expired");
  }
  // Find user's cart
  const cart = await Cart.findOne({ orderby: _id });
  if (!cart) {
    throw new Error("Cart not found");
  }
  // Apply discount
  const totalAfterDiscount = (
    cart.cartTotal -
    (cart.cartTotal * validCoupon.discount) / 100
  ).toFixed(2);
  cart.totalAfterDiscount = totalAfterDiscount;
  cart.appliedCoupon = validCoupon._id;
  await cart.save();
  res.json({
    cartTotal: cart.cartTotal,
    discount: validCoupon.discount,
    totalAfterDiscount,
  });
});

// create order
const createOrder = asyncHandler(async (req, res) => {
  const { COD } = req.body;
  const { _id } = req.user;
  validateMongodbId(_id);
  if (!COD) {
    throw new Error("Create cash order failed");
  }
  // Get cart
  const userCart = await Cart.findOne({ orderby: _id });
  if (!userCart) {
    throw new Error("Cart not found");
  }
  // Final amount logic
  let finalAmount;
  if (userCart.totalAfterDiscount) {
    finalAmount = Number(userCart.totalAfterDiscount) * 100;
  } else {
    finalAmount = userCart.cartTotal * 100;
  }
  // Create order
  const newOrder = await Order.create({
    products: userCart.products,
    paymentIntent: {
      id: uniqid(),
      method: "COD",
      amount: finalAmount,
      status: "Cash on Delivery",
      created: Date.now(),
      currency: "INR",
    },
    orderby: _id,
    orderStatus: "Cash on Delivery",
    });
    if (userCart.appliedCoupon) {
        await Coupon.findByIdAndUpdate(
        userCart.appliedCoupon,
        { isActive: false }
    );
}
  // Clear cart
  await Cart.findOneAndDelete({ orderby: _id });
  res.json({
    message: "Order placed successfully",
    newOrder,
  });
});



module.exports = { 
    createUser, 
    loginUserCtrl,
    loginAdminCtrl,
    updateUser,
    saveAddress,
    getallUser, 
    getaUser, 
    deleteUser,
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
};
