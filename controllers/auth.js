const {validationResult} = require('express-validator')
const smsMsg = require('../helpers/sms')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const {tokenSecret} = require('../config')
const tryCatch = require('../utils/trycatch')
const {promisify} = require('util')


exports.postMobile = (req,res,next)=>{
   const {mobile,countryCode} = req.body
   const errors = validationResult(req)
   if(!errors.isEmpty()){
    return res.status(422).json({success:false,info:errors})
   }
   const phone = `${countryCode}${mobile}`
   const otp = Math.floor(100000+(Math.random()*900000))
   const payload = {
    phone:phone,
    otp:otp
   } 
  const token = jwt.sign(payload,tokenSecret)
  smsMsg(`Your one time verification code is ${otp}`,phone)
  .then(sent=>{
    res.status(200).json({
        success: true,
        message:'OTP sent to your mobile number',
        token:token
      })
  })
  .catch(error=>{
    console.log(error)
  }) 
}
exports.postVerifyOtp = tryCatch(async(req,res,next)=>{
    const token = req.body['token']
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(422).json({success:false,info:errors})
  }
  const decoded = await promisify(jwt.verify)(token,tokenSecret)
   res.status(200).json(
    {
        success:true,
        phone:decoded['phone']
    }
  )
})

exports.postSignup = (req,res,next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({info:errors})
    }
    res.json({success:true})
}