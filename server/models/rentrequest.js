const mongoose = require("mongoose");

const rentrequestSchema = new mongoose.Schema(
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
    owner_verify:{type: Boolean},
    sender_verify:{type:Boolean},
    proposed_price:{type:Number}
  },
  { timestamps: true }
);

module.exports = mongoose.model("rentrequests", rentrequestSchema);