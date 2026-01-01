const Color = require("../Models/colorModel");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongodbid");

// create color
const createColor = asyncHandler(async (req, res) => {
  const newColor = await Color.create(req.body);
  res.status(201).json(newColor);
});

// update color
const updateColor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  const updatedColor = await Color.findByIdAndUpdate(
    id,
    req.body,
    { new: true }
  );
  if (!updatedColor) {
    res.status(404);
    throw new Error("Color not found");
  }
  res.json(updatedColor);
});

// delete color
const deleteColor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  const deletedColor = await Color.findByIdAndDelete(id);
  if (!deletedColor) {
    res.status(404);
    throw new Error("Color not found");
  }
  res.json({
    message: "Color deleted successfully",
    deletedColor,
  });
});

// get single color
const getColor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  const color = await Color.findById(id);
  if (!color) {
    res.status(404);
    throw new Error("Color not found");
  }
  res.json(color);
});

// get all colors
const getAllColors = asyncHandler(async (req, res) => {
  const colors = await Color.find();
  res.json(colors);
});

module.exports = { createColor, updateColor, deleteColor, getColor, getAllColors,};
