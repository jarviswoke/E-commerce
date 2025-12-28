const Product = require("../Models/productModel");
const User = require("../Models/userModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

// create product route
const createProduct = asyncHandler(async (req, res) => {
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title, {
                lower: true,
                strict: true,
            });
        }
        const newProduct = await Product.create(req.body);
        res.status(201).json({
            success: true,
            message: "🛒 Avengers, assemble! A new product has entered the battlefield.",
            product: newProduct,
        });
    } catch (error) {
        throw new Error(error);
    }
});

// update product
const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title, {
                lower: true,
                strict: true,
            });
        }
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedProduct) {
            res.status(404);
            throw new Error("Product not found");
        }
        res.status(200).json({
            success: true,
            message: "⚡ Product updated — even Stark would approve.",
            product: updatedProduct,
        });
    } catch (error) {
        throw new Error(error);
    }
});

// get a product
const getProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
        res.status(404);
        throw new Error("This is not the product you are looking for 🛡️");
    }
    res.status(200).json({
        success: true,
        message: "Product retrieved. Avengers level access granted ⚡",
        product,
    });
});

// get all products
const getAllProducts = asyncHandler(async (req, res) => {
  try {
    // FILTERING
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach(el => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    let query = Product.find(JSON.parse(queryStr));

    // SORTING
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // FIELD LIMITING
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // PAGINATION
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Page validation (WITH FILTER)
    if (req.query.page) {
      const productCount = await Product.countDocuments(
        JSON.parse(queryStr)
      );
      if (skip >= productCount) {
        res.status(404);
        throw new Error("This page does not exist");
      }
    }

    query = query.skip(skip).limit(limit);
    const products = await query;
    res.status(200).json({
      success: true,
      count: products.length,
      page,
      products,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// delete product
const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            res.status(404);
            throw new Error("Product not found");
        }

        res.status(200).json({
            success: true,
            message: "🗑️ Product eliminated. Thanos would be proud.",
            product: deletedProduct,
        });
    } catch (error) {
        throw new Error(error);
    }
});


// ADD / REMOVE PRODUCT FROM WISHLIST
const addToWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { prodId } = req.body;
  const user = await User.findById(_id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  const alreadyAdded = user.wishlist.includes(prodId);
  if (alreadyAdded) {
    await User.findByIdAndUpdate(
      _id,
      { $pull: { wishlist: prodId } },
      { new: true }
    );
  } else {
    await User.findByIdAndUpdate(
      _id,
      { $push: { wishlist: prodId } },
      { new: true }
    );
  }

  // POPULATE HERE
  const updatedUser = await User.findById(_id)
    .populate("wishlist");

  res.status(200).json({
    success: true,
    user: {
      firstname: updatedUser.firstname,
      lastname: updatedUser.lastname,
      email: updatedUser.email,
      wishlist: updatedUser.wishlist,
    },
  });
});

const rating = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, comment, prodId } = req.body;
  try {
    // Find product
    const product = await Product.findById(prodId);
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }
    // Check if already rated
    const alreadyRated = product.ratings.find(
      (r) => r.postedby.toString() === _id.toString()
    );
    // Update or add rating
    if (alreadyRated) {
      await Product.findOneAndUpdate(
        { _id: prodId, "ratings.postedby": _id },
        {
          $set: {
            "ratings.$.star": star,
            "ratings.$.comment": comment,
          },
        }
      );
    } else {
      await Product.findByIdAndUpdate(prodId, {
        $push: {
          ratings: {
            star,
            comment,
            postedby: _id,
          },
        },
      });
    }
    // Recalculate total rating
    const updatedProduct = await Product.findById(prodId);
    const totalRatings = updatedProduct.ratings.length;
    const ratingSum = updatedProduct.ratings.reduce(
      (sum, item) => sum + item.star,
      0
    );

    const actualRating =
      totalRatings === 0 ? 0 : Math.round(ratingSum / totalRatings);

    // Save totalrating
    const finalProduct = await Product.findByIdAndUpdate(
      prodId,
      { totalrating: actualRating },
      { new: true }
    );

    res.json(finalProduct);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});



module.exports = { createProduct, getProduct, getAllProducts, updateProduct, deleteProduct, addToWishlist, rating };
