const Enquiry = require("../Models/enqModel");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongodbid");

// create enquiry
const createEnquiry = asyncHandler(async (req, res) => {
  const newEnquiry = await Enquiry.create(req.body);
  res.status(201).json(newEnquiry);
});

// update enquiry
const updateEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  const updatedEnquiry = await Enquiry.findByIdAndUpdate(
    id,
    req.body,
    { new: true }
  );
  if (!updatedEnquiry) {
    res.status(404);
    throw new Error("Enquiry not found");
  }
  res.json(updatedEnquiry);
});

// delete enquiry
const deleteEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  const deletedEnquiry = await Enquiry.findByIdAndDelete(id);
  if (!deletedEnquiry) {
    res.status(404);
    throw new Error("Enquiry not found");
  }
  res.json({
    message: "Enquiry deleted successfully",
    deletedEnquiry,
  });
});

// get single enquiry
const getEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  const enquiry = await Enquiry.findById(id);
  if (!enquiry) {
    res.status(404);
    throw new Error("Enquiry not found");
  }
  res.json(enquiry);
});

// get all enquiries
const getAllEnquiries = asyncHandler(async (req, res) => {
  const enquiries = await Enquiry.find();
  res.json(enquiries);
});

module.exports = {
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
  getEnquiry,
  getAllEnquiries,
};
