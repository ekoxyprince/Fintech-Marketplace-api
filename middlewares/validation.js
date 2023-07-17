const {check,body} = require('express-validator')
const User = require('../models/user')
const {promisify} = require('util')
const jwt = require('jsonwebtoken')
const {tokenSecret} = require('../config')

const emailValidation = 
check('email')
.notEmpty().withMessage('The email field requires a value')
.isEmail().withMessage('Please insert a valid email address')
.normalizeEmail()

const passwordValidation  =
body('password')
.notEmpty().withMessage('The password field requires a value')
.isLength({min:8}).withMessage('password must be at least 8 characters')
.matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
.withMessage('Password must contain atleast one lowercase, one uppercase, one digit and one special character')
.trim()

const confirmPasswordValidation = 
body('confirm-password')
.custom((value,{req})=>{
    if(value!== req.body['password']){
        throw new Error("Passwords do not match")
    }
    return true;
})
const mobileValidation =
body('mobile')
.notEmpty().withMessage('The phone number field requires a value')
.isNumeric().withMessage('Only numbers are allowed')
.custom((value,{req})=>{
 return User.findOne({phone:value})
 .then(foundUser=>{
    if(foundUser){
        Promise.reject('This phone number is linked to an account')
    }
 })
})
const countryCodeValidation = 
body('countryCode')
.notEmpty().withMessage('Country code required.')

const otpValidation =
body('otp')
.notEmpty().withMessage('The one time password field is required')

const tokenValidation = 
body('token')
.notEmpty().withMessage('Invalid verification token kindly request for a new otp code')
.custom(async(value,{req})=>{
 const decoded = await promisify(jwt.verify)(value,tokenSecret)
 if(decoded['otp'].toString() !== req.body['otp']){
    throw new Error('Incorrect OTP code')
 }
 return true
})
const userValidation = 
check('email')
.notEmpty().withMessage('The email field requires a value')
.isEmail().withMessage('Please insert a valid email address')
.custom((value,{req})=>{
 return User.findOne({email:value})
  .then(foundUser=>{
    if(foundUser){
        Promise.reject("An Account with this Email already exists")
    }
  })
})
.normalizeEmail()

const phoneValidation = 
body('phone')
.notEmpty().withMessage('Phone number cannot be empty').trim()


module.exports = 
{
    email:emailValidation,
    password:passwordValidation,
    confirmpassword : confirmPasswordValidation,
    phoneVerification:mobileValidation,
    countryCode:countryCodeValidation,
    token:tokenValidation,
    otp:otpValidation,
    user:userValidation,
    phone:phoneValidation
}
