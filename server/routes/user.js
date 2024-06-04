const express = require('express')

// controller functions
const { loginUser, signupUser, verifymail, find } = require('../controllers/userController')

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

router.get('/verify/:email/:token', verifymail)

router.get("/find/:id", find) 

module.exports = router