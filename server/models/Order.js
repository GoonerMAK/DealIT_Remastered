const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: { type: String,},
        quantity: { type: Number, default: 1,},
      },
    ],

    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);

// timestamps = create and update times will be stored

// a order can have multiple products, that's why the schema has an array of products

// here the type of address is "object"... because stripe will return an object which will have multiple lines