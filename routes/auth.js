const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')
const {email,password,confirmpassword,phoneVerification,countryCode,otp,token} = require('../middlewares/validation')

router
.route('/mobile_verification')
.post([phoneVerification,countryCode],authController.postMobile)
router
.route('/otp_verification')
.post([otp,token],authController.postVerifyOtp)
router
.route('/signup')
.post([email,password,confirmpassword],
    authController.postSignup)

module.exports = router