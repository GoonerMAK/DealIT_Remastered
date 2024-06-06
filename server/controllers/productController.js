const Product = require("../models/Products");
const mongoose = require("mongoose");
const Rentrequest = require("../models/rentrequest");
const Exchangerequest = require("../models/exchange_request");

// Add new Product for sell
const addsellProduct = async (req, res) => {
  const { user_email, title, desc, img, price, selectedCategories } = req.body; //, categories
  const categories = selectedCategories;
  console.log(categories);
  //let emptyFields = []

  if (!title || !desc || !img || !price || !categories) {
    //||!categories
    return res.status(400).json({ error: "Please fill in all the fields" });
  }

  // add doc to db
  try {
    // const user_id = req.user._id
    const type = "pending";
    const purpose = "Sell";
    const product = await Product.create({
      user_email,
      title,
      desc,
      img,
      price,
      type,
      purpose,
      categories,
    }); //, categories
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//add product for exchange
const addexchangeProduct = async (req, res) => {
  // const title= req.body.title
  // const user_email= req.body.user_email
  // const desc= req.body.desc
  // const preference= req.body.preference
  // const categories = req.body.categories
  // const exchangetype = req.body.exchangetype
  // const img = req.files.originalname
  const { user_email, title, desc, img, preference, selectedCategories, exchangetype } = req.body; //, categories
  // console.log(req.body)

  const categories = selectedCategories;

  console.log(user_email, title, desc, img, preference, categories, exchangetype);
  //let emptyFields = []

  if (!title || !desc || !preference || !exchangetype || !categories) {
    //||!categories ||!img
    return res.status(400).json({ error: "Please fill in all the fields" });
  }

  // add doc to db
  try {
    //const user_id = req.user._id
    const type = "pending";
    const purpose = "Exchange";
    //const img="fhgfhgf"
    // console.log({user_email, title ,desc ,img ,preference,  exchangetype, type, purpose, categories})
    const product = await Product.create({
      user_email,
      title,
      desc,
      img,
      preference,
      exchangetype,
      type,
      purpose,
      categories,
    }); //, categories
    console.log(product);
    console.log("addition worked");
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//add product for rent
const addrentProduct = async (req, res) => {
  const { user_email, title, desc, img, price, prefer, selectedCategories } = req.body; //, categories
  const categories = selectedCategories;
  console.log(categories);
  //let emptyFields = []

  if (!title || !desc || !img || !price || !prefer || !categories) {
    //||!categories
    return res.status(400).json({ error: "Please fill in all the fields" });
  }

  // add doc to db
  try {
    // const user_id = req.user._id
    const type = "pending";
    const purpose = "Rent";
    const product = await Product.create({
      user_email,
      title,
      desc,
      img,
      prefer,
      price,
      type,
      purpose,
      categories,
    }); //, categories
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//sent request for exchange
const exchangerequest = async (req, res) => {
  const { title, desc, img, owner_id, sender_id, objectid } = req.body;
  var return_date = req.body.returndate;
  // return_date= new Date(return_date)
  const owner_verify = false;
  const sender_verify = false;
  console.log(req.body);
  if (!owner_id || !sender_id || !objectid || !title || !desc) {
    return res.status(400).json({ error: "Please fill in all the fields" });
  }
  try {
    // const user_id = req.user._id

    const exchangerequest = await Exchangerequest.create({
      title,
      desc,
      img,
      owner_id,
      sender_id,
      objectid,
      return_date,
      owner_verify,
      sender_verify,
    });
    console.log(exchangerequest); //, categories
    res.status(200).json(exchangerequest);
    console.log("Exchange kaj korse");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//sent request for rent
const rentngerequest = async (req, res) => {
  const { owner_id, sender_id, renttype, objectid, proposed_price } = req.body;
  console.log(req.body);
  const owner_verify = false;
  const sender_verify = false;
  console.log(owner_id, sender_id, objectid, renttype);
  if (!owner_id || !sender_id || !objectid || !renttype) {
    return res.status(400).json({ error: "Please fill in all the fields" });
  }
  try {
    // const user_id = req.user._id

    const rentrequest = await Rentrequest.create({
      owner_id,
      sender_id,
      objectid,
      renttype,
      proposed_price,
      owner_verify,
      sender_verify,
    });
    console.log(rentrequest); //, categories
    res.status(200).json(rentrequest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  addsellProduct,
  addexchangeProduct,
  addrentProduct,
  rentngerequest,
  exchangerequest,
};
