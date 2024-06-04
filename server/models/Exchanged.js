const mongoose = require("mongoose");

const exchanged = new mongoose.Schema(
  {
    tittle: { type: String, required: true },
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

    objectid:{type: String},
    return_date:{type: Date},
    contract:{type:String}
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("exchanged", exchanged);