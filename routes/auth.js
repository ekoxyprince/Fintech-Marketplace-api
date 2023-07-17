const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')
const {email,password,confirmpassword,phoneVerification,countryCode,otp,token,user,phone} = require('../middlewares/validation')

router
.route('/mobile_verification')
.post([phoneVerification,countryCode],authController.postMobile)
router
.route('/otp_verification')
.post([otp,token],authController.postVerifyOtp)
router
.route('/signup')
.post([user,phone,password,confirmpassword],
    authController.postSignup)
router
.route('/signin')
.post([email,password],authController.postSignin)

module.exports = router