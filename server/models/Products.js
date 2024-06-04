const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, },
    desc: { type: String, required: true, },
    img: { type: String, required: true },
    categories: { type: Array, required: true},
    price: { type: Number },
    exchangetype:{type: String},
    prefer:{type: String},
    purpose:{type: String},
    type: { type: String, required: true  },
    user_email: {
      type: String,
      //required: true
    }
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Products", ProductSchema);

// timestamps = create and update times will be stored