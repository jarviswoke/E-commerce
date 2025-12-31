const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        count: {
          type: Number,
          required: true,
        },
        color: {
          type: String,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],

    cartTotal: {
      type: Number,
      default: 0,
    },

    totalAfterDiscount: {
      type: Number,
      default: 0,
    },

    orderby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
