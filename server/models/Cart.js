const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: {type: String,},
        quantity: {type: Number, default: 1,},
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);

// timestamps = create and update times will be stored

// a cart can have multiple products, that's why the schema has an array of products
