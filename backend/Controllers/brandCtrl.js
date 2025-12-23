const Brand = require("../Models/brandModel");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongodbid");

// CREATE brand
const createBrand = asyncHandler(async (req, res) => {
    const newBrand = await Brand.create(req.body);
    res.status(201).json(newBrand);
});

// UPDATE brand
const updateBrand = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    const updatedBrand = await Brand.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
    );
    if (!updatedBrand) {
        res.status(404);
        throw new Error("Brand not found");
    }
    res.json(updatedBrand);
});

// DELETE brand
const deleteBrand = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    const deletedBrand = await Brand.findByIdAndDelete(id);
    if (!deletedBrand) {
        res.status(404);
        throw new Error("Brand not found");
    }
    res.json({
        message: "Brand deleted successfully",
        deletedBrand,
    });
});

// GET single brand
const getBrand = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    const brand = await Brand.findById(id);

    if (!brand) {
        res.status(404);
        throw new Error("Brand not found");
    }
    res.json(brand);
});

// GET all brands
const getAllBrands = asyncHandler(async (req, res) => {
    const brands = await Brand.find();
    res.json(brands);
});

module.exports = {
    createBrand,
    updateBrand,
    deleteBrand,
    getBrand,
    getAllBrands,
};
