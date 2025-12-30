const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    numViews: {
      type: Number,
      default: 0,
    },

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    dislikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    images: [
      {
        url: String,
        public_id: String,
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("Blog", blogSchema);
