const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const mailsender= require('./mailsender')

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login a user
const loginUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.login(email, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token, user})
    
    //cookie implement
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// signup a user
const signupUser = async (req, res) => {
  const {username, Phone, NID, email, password, checkpassword} = req.body

  try {
    const user = await User.signup(username, Phone, NID, email, password, checkpassword)
    await mailsender(email)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token,user})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const verifymail = async (req, res) => {
  const token=req.params.token
  const email=req.params.email
  console.log(token)
  console.log(email)
  var check=false
  jwt.verify(token, process.env.MAILSECRET, function(err, decoded){
    if(err){
      console.log(err)
      res.send("Email verification failed")
    }else{
      res.send("Email is verified")
      check=true
    }
  })
  console.log(check)
  if(check){
    console.log("came in to loop")
    await User.updateOne({email:email}, {$set:{ verfied:true}})
  }
  
}

const find= async(req, res) => {
  try {
    console.log("user find")
  const user = await User.findById(req.params.id);
  res.status(200).json(user);
} catch (err) {
  res.status(500).json(err);
}
}
module.exports = { signupUser, loginUser, verifymail, find }