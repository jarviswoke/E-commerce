const Coupon = require("../Models/couponModel");
const validateMongodbId = require("../utils/validateMongodbid");
const asyncHandler = require("express-async-handler");

// create coupon
const createCoupon = asyncHandler(async (req, res) => {
    const { name, expiry, discount } = req.body;
  // Basic validation
  if (!name || !expiry || !discount) {
    res.status(400);
    throw new Error("Please provide name, expiry, and discount");
  }
  // Check if coupon already exists
  const existingCoupon = await Coupon.findOne({ name });
  if (existingCoupon) {
    res.status(409);
    throw new Error("Coupon already exists");
  }
  // Create coupon
  const newCoupon = await Coupon.create({
    name: name.toUpperCase(),
    expiry,
    discount,
  });
  res.status(201).json({
    success: true,
    message: "Coupon created successfully",
    data: newCoupon,
  });
});

// get all coupon
const getAllCoupons = asyncHandler(async (req, res) => {
  const coupons = await Coupon.find();

  res.status(200).json({
    success: true,
    count: coupons.length,
    data: coupons,
  });
});

// update coupon
const updateCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, expiry, discount } = req.body;
  // Validate MongoDB ID
  validateMongodbId(id);
  const updatedCoupon = await Coupon.findByIdAndUpdate(
    id,
    {
      name: name?.toUpperCase(),
      expiry,
      discount,
    },
    { new: true }
  );
  if (!updatedCoupon) {
    res.status(404);
    throw new Error("Coupon not found");
  }
  res.status(200).json({
    success: true,
    message: "Coupon updated successfully",
    data: updatedCoupon,
  });
});

// delete couppon
const deleteCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  const deletedCoupon = await Coupon.findByIdAndDelete(id);
  if (!deletedCoupon) {
    res.status(404);
    throw new Error("Coupon not found");
  }
  res.status(200).json({
    success: true,
    message: "Coupon deleted successfully",
    data: deletedCoupon,
  });
});

module.exports = { createCoupon, getAllCoupons, updateCoupon, deleteCoupon };