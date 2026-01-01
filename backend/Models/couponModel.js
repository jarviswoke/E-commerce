const mongoose = require('mongoose'); 

var couponSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true,
        uppercase: true,
    },
    expiry:{
        type: Date,
        required: true,
    },
    discount:{
        type: Number,
        required: true,
        min: 1,
        max: 90,
    },
     isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Coupon', couponSchema);