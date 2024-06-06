
const Product = require("../models/Products");

const rentrequest = require("../models/rentrequest");
const exchangerequest= require("../models/exchange_request")
const rented= require("../models/Rented");
const exchanged = require("../models/Exchanged")
const { findById } = require("../models/userModel");



const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin,} = require("./verifyToken");

const router = require("express").Router();




//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});


//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});


//GET PRODUCT
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PRODUCT od user
router.get("/find/user/:id", async (req, res) => {
  try {
    const product = await Product.find({user_email:req.params.id});
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});


// GET ALL PRODUCTS
router.get("/", async (req, res) => {
  const qCategory = req.query.categories;
  const qfilter = req.query.filters;
  console.log("products", qCategory)
  console.log("filter", qfilter)
  try {
    let products;
    
    if (!qCategory && !qfilter) {
      products = await Product.find();
    } else if (!qCategory) {
      products = await Product.find({ categories: { $in: [qfilter] } });
    } else if (!qfilter) {
      products = await Product.find({ purpose: qCategory });
    } else {
      products = await Product.find({ purpose: qCategory, categories: { $in: [qfilter] } });
    }
    console.log(products)
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});


//get product request
router.get("/rentreq/:id", async (req, res)=>{
  try{
    const Id=req.params.id
    console.log(Id)
    const rentrequests= await rentrequest.find({owner_id:req.params.id})
    // const products=await Product.findById(rentrequests[0].objectid)
    // console.log(products)
    res.status(200).json(rentrequests)
  }catch (err){
    res.status(500).json(err)
    console.log(err)
  }
}
)

router.post("/rentreq/verifyowner/:id", async(req, res)=>{
  try{
    const id=req.params.id
    console.log(id)
    const {price, renttype}=req.body
    console.log(price)
    await rentrequest.findByIdAndUpdate(id, {owner_verify:true, proposed_price:price, renttype:renttype})
    res.status(200).json("upadated")
    // await rentrequest.updateOne({_id:id}, {$set: {owner_verify:true, proposed_price:price}})
    //Add nodemailer here

  }catch (err){
    res.status(500).json(err)
    console.log(err)
  }
})

router.get("/rentreq/pending/:id", async (req, res)=>{
  try{
    const Id=req.params.id
    console.log(Id)
    const Rentrequests = await rentrequest.find({sender_id:req.params.id})
    // const products=await Product.findById(rentrequests[0].objectid)
    // console.log(products)
    res.status(200).json(Rentrequests)
  }catch (err){
    res.status(500).json(err)
    console.log(err)
  }
}
)

//find if this user already updated any other request
router.get("/rentreq/find/:id", async (req, res)=>{
  try{
    const Id=req.params.id
    console.log(Id)
    const  Rentrequests= await rentrequest.find({owner_id:req.params.id, owner_verify:true})
    // const products=await Product.findById(rentrequests[0].objectid)
    // console.log(products)
    res.status(200).json(Rentrequests)
  }catch (err){
    res.status(500).json(err)
    console.log(err)
  }
}
)

router.post("/rentreq/sender/:id", async(req, res)=>{
  try{
    const id=req.params.id
    const contract=req.body.text
    console.log(id)
    const rentrequests= await rentrequest.findById(id)
    if(rentrequests.owner_verify){
      //add nodemailer here
      const owner_id=rentrequests.owner_id
      const sender_id=rentrequests.sender_id
      const objectid=rentrequests.objectid
      const renttype=rentrequests.renttype
      const rent_price=rentrequests.proposed_price
      const Rented= await rented.create({owner_id, sender_id, objectid, renttype, rent_price,contract})
      console.log(Rented)
      await Product.findByIdAndUpdate(objectid, {type:"Rented"})
      await rentrequest.findByIdAndDelete(id)
      res.status(200).json(Rented)
    }else{
      throw Error('Owner has not verified yet')
    }
    
  }catch (err){
    res.status(500).json(err)
    console.log(err)
  }
})

//exchange request reject by customer
router.post("rentreq/sender/reject/:id", async(req, res)=>{
  try{
    const id=req.params.id
    console.log(id)
    const Rentrequests= await rentrequest.findById(id)
    if(Rentrequests.owner_verify){
      await rentrequest.findByIdAndDelete(id)
      res.status(200).json("deleted")
    }else{
      throw Error('Owner has not verified yet')
    }
    
  }catch (err){
    res.status(500).json(err)
    console.log(err)
  }
})

router.get("/search/", async (req, res) => {
  try {
    const products = await Product.find({
      title: {
        $regex: req.query.search,
        $options: "i",
      },
    });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
})

router.get("/exchangereq/:id", async (req, res)=>{
  try{
    const Id=req.params.id
    console.log(Id)
    const Exchangerequest = await exchangerequest.find({owner_id:req.params.id})
    // const products=await Product.findById(rentrequests[0].objectid)
    // console.log(products)
    res.status(200).json(Exchangerequest)
  }catch (err){
    res.status(500).json(err)
    console.log(err)
  }
}
)
router.get("/exchangereq/pending/:id", async (req, res)=>{
  try{
    const Id=req.params.id
    console.log(Id)
    const Exchangerequest = await exchangerequest.find({sender_id:req.params.id})
    // const products=await Product.findById(rentrequests[0].objectid)
    // console.log(products)
    res.status(200).json(Exchangerequest)
  }catch (err){
    res.status(500).json(err)
    console.log(err)
  }
}
)

//find if this user already updated any other request
router.get("/exchangereq/find/:id", async (req, res)=>{
  try{
    const Id=req.params.id
    console.log(Id)
    const Exchangerequest = await exchangerequest.find({owner_id:req.params.id, owner_verify:true})
    // const products=await Product.findById(rentrequests[0].objectid)
    // console.log(products)
    res.status(200).json(Exchangerequest)
  }catch (err){
    res.status(500).json(err)
    console.log(err)
  }
}
)

router.post("/exchangereq/verifyowner/:id", async(req, res)=>{
  try{
    const id=req.params.id
    console.log(id)
    var return_date=req.body.returndate
    await exchangerequest.findByIdAndUpdate(id, {owner_verify:true, return_date:return_date})
    res.status(200).json("upadated")
    // await rentrequest.updateOne({_id:id}, {$set: {owner_verify:true, proposed_price:price}})
    //Add nodemailer here

  }catch (err){
    res.status(500).json(err)
    console.log(err)
  }
})

//final sender accept for exchange
router.post("/exchangereq/sender/:id", async(req, res)=>{
  try{
    const id=req.params.id
    const contract=req.body.text
    console.log(id)
    const Exchangerequests= await exchangerequest.findById(id)
    if(Exchangerequests.owner_verify){
      const owner_id=Exchangerequests.owner_id
      const sender_id=Exchangerequests.sender_id
      const objectid=Exchangerequests.objectid
      const return_date=Exchangerequests.return_date
      const tittle=Exchangerequests.title
      const desc=Exchangerequests.desc
      const img=Exchangerequests.img
      const Exchanged= await exchanged.create({tittle,desc,img, owner_id, sender_id, objectid, return_date, contract})
      // console.log("for exchange",Exchanged)
      await Product.findByIdAndUpdate(objectid, {type:"Exchanged"})
      await exchangerequest.deleteMany({objectid:objectid})
      res.status(200).json("OK")
    }else{
      throw Error('Owner has not verified yet')
    }
    
  }catch (err){
    res.status(500).json(err)
    console.log(err)
  }
})
//exchange request reject by customer
router.post("exchangereq/sender/reject/:id", async(req, res)=>{
  try{
    const id=req.params.id
    console.log(id)
    const Exchangerequests= await exchangerequest.findById(id)
    if(Exchangerequests.owner_verify){
      await exchangerequest.findByIdAndDelete(id)
      res.status(200).json("deleted")
    }else{
      throw Error('Owner has not verified yet')
    }
    
  }catch (err){
    res.status(500).json(err)
    console.log(err)
  }
})

//get exchanged product
router.get("/exchanged/find/:id", async (req, res)=>{
  try{
    const Id=req.params.id
    console.log(Id)
    const Exchanged = await exchanged.find({$or:[{owner_id:req.params.id},{sender_id:req.params.id}]})
    // const products=await Product.findById(rentrequests[0].objectid)
    // console.log(products)
    res.status(200).json(Exchanged)
  }catch (err){
    res.status(500).json(err)
    console.log(err)
  }
}
)

router.get("/rented/find/:id", async (req, res)=>{
  try{
    const Id=req.params.id
    console.log(Id)
    const Rented = await rented.find({$or:[{owner_id:req.params.id},{sender_id:req.params.id}]})
    // const products=await Product.findById(rentrequests[0].objectid)
    // console.log(products)
    res.status(200).json(Rented)
  }catch (err){
    res.status(500).json(err)
    console.log(err)
  }
}
)
module.exports = router;