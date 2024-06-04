const mongoose = require("mongoose");

const rentSchema = new mongoose.Schema(
  {
    owner_id: {
        type: String,
        //required: true
      },
      sender_id: {
        type: String,
        //required: true
      },
    objectid:{type: String},
    renttype:{type: String},
    rent_price:{type:Number},
    contract:{type:String}
  },
  { timestamps: true }
);

module.exports = mongoose.model("rented", rentSchema);