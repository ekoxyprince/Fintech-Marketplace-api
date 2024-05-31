const { isNull } = require('lodash')
const AuthService = require('../services/userservices/auth.services')
const trycatch = require('../utilities/trycatch')

exports.signup = trycatch(async(req,res)=>{
 const user = await AuthService.createUser(req.body)
 res.status(201).json({
    success:true,
    status:'success',
    code:201,
    data:{
      msg:"Signup successful"
    }
 })
})
exports.signin = trycatch(async(req,res)=>{
   const details = await AuthService.signinUser(req.body)
   res.status(200).json({
      success:true,
      code:200,
      status:'success',
      data:{
         ...details,
         msg:"Signin successful"
      }
   })
})