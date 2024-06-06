const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const mailsender= require('../controllers/mailsender')

const Schema = mongoose.Schema

const userSchema = new Schema({
  username:{
    type: String,
    require: true,
  },
  Phone:{
    type: Number,
    require: true,
  },
  NID:{
    type: Number,
    require: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  verfied:{
    type: Boolean,
    default: false
  }
})

// static signup method
userSchema.statics.signup = async function(username, Phone, NID, email, password, checkpassword) {

  // validation
  if (!email || !password ||!username || !Phone || !NID || !checkpassword) {
    throw Error('All fields must be filled')
  }
  if (!validator.isEmail(email)) {
    throw Error('Email not valid')
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough')
  }
  if (password!==checkpassword){
    throw Error('Please enter same password to confirm')
  }

  const exists = await this.findOne({ email })

  if (exists) {
    throw Error('Email already in use')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ username, Phone, NID, email, password: hash })
  console.log(username)

  return user
}

// static login method
userSchema.statics.login = async function(email, password) {

  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({ email })
  if (!user) {
    throw Error('Incorrect email')
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Incorrect password')
  }
  if(!user.verfied){
    await mailsender(email)
    throw Error('Your Email ID is not verified. An verfication mail has sent to your email')
  }

  return user
}

module.exports = mongoose.model('Users', userSchema)