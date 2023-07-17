const jwt = require('jsonwebtoken')
const {promisify} = require('util')
const {jwtSecret} = require('../config')
const User = require('../models/user')

module.exports = async(req,res,next)=>{
    try {
        const authHeader = req.headers['authorization']
        const authToken = authHeader && authHeader.split(" ")[1]
        if(!authToken){
            return res.status(401).json({success:false,info:{message:'Unauthorized request'}})
        }else{
         const decoded = await promisify(jwt.verify)(authToken,jwtSecret)
         const _id = decoded._id
         const user = await User.findOne({_id:_id})
         if(user){
            req.user = user
            next()
         }
        }    
    } catch (error) {
       console.log(error) 
    }
}