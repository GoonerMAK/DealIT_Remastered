const mongoose = require("mongoose");

const exchangerequest = new mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    owner_id: {
        type: String,
        //required: true
      },
      sender_id: {
        type: String,
        //required: true
      },
    owner_verify:{type: Boolean},
    sender_verify:{type:Boolean},
    objectid:{type: String},
    return_date:{type: Date}
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("exchangerequest", exchangerequest);