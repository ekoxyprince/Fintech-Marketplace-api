const {validationResult} = require('express-validator')
const smsMsg = require('../helpers/sms')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const {tokenSecret} = require('../config')
const tryCatch = require('../utils/trycatch')
const {promisify} = require('util')
const bcrypt = require('bcryptjs')
const {jwtSecret,jwtExpiresIn} = require('../config')


exports.postMobile = (req,res,next)=>{
   const {mobile,countryCode} = req.body
   const errors = validationResult(req)
   if(!errors.isEmpty()){
    return res.status(422).json({success:false,info:errors})
   }
   const phone = `${countryCode}${mobile}`
   const otp = Math.floor(100000+(Math.random()*900000))
   const payload = {
    phone:mobile,
    otp:otp,
    code:countryCode
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
        phone:decoded['phone'],
        countryCode:decoded['code']
    }
  )
})

exports.postSignup = (req,res,next)=>{
    const {firstname,lastname,email,password,phone,countryCode} =  req.body
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({success:false,info:errors})
    }
    bcrypt.hash(password,12)
    .then(hashedPassword=>{
      return  User.create({
          firstName:firstname,
          lastName:lastname,
          email:email,
          password:hashedPassword,
          phone:`${countryCode}${phone}`,
          role:'Subscriber',
          image:'/static/default_image.png',
          account:{
            nairaBalance:0,
            cryptoBalance:0,
            accountNumber:0,
            transferPin:null,
            portfolio:[]
          },
          beneficiaries:[]
        })
    })
    .then(createdUser=>{
        return res.status(200).json({success:true,info:createdUser})
    })
    .catch(error=>{
        console.log(error)
    })
    
}

exports.postSignin = (req,res,next)=>{
    const {email,password} = req.body
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({success:false,info:errors})
    }
    User.findOne({email:email})
    .then(foundUser=>{
        if(!foundUser){
            return res.status(422).json({success:false,info:{message:'Incorrect email address'}})
        }else{
           return bcrypt.compare(password,foundUser.password)
            .then(doMatch=>{
            if(!doMatch){
           return res.status(422).json({success:false,info:{message:'Incorrect password'}})
            }else{
             const token = jwt.sign({_id:foundUser._id},jwtSecret,{expiresIn:jwtExpiresIn})
             return res.status(200).json({success:true,info:{data:foundUser,accessToken:token}})
            }
        })}
    })
    .catch(error=>{
        console.log(error)
    })
}