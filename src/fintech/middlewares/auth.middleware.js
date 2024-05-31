const jwt = require("jsonwebtoken")
const {jwt_secret} = require("../config/config")
const {promisify} = require("util")
const User = require("../database/models/user.model")
const {AuthenticationError} = require("../exceptions/errors")
const UserService = require("../services/userservices/user.services")
const { password } = require("../validations/auth.validation")

module.exports = async(req,res,next)=>{
try {
    const token = req.headers['authorization'] && req.headers['authorization'].split(" ")[1]
    if(!token || typeof token == "undefined") throw new AuthenticationError("Invalid Auth token")
    const decoded = await promisify(jwt.verify)(token,jwt_secret)
    const user = await User.findById(decoded.id).select({password:0,pin:0,__v:0})
    if(!user) throw new AuthenticationError("Invalid Auth token")
    req.user = new UserService(user) 
    next()
} catch (error) {
    next(error)
}
    
}