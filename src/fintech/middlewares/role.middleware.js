const {AuthorizationError} = require("../exceptions/errors")

exports.user = (req,res,next)=>{
    const userDetails = req.user.instance
    if(userDetails.role !== "user") throw new AuthorizationError("Request unauthorized")
    next()
}
exports.admin = (req,res,next)=>{
    const userDetails = req.user.instance
    if(userDetails.role !== "admin") throw new AuthorizationError("Request unauthorized")
     next()   
}
