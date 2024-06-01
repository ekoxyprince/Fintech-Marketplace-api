const UserService = require('../services/userservices/user.services')
const catchAsync = require("../utilities/trycatch")

exports.findUserByTag = catchAsync(async(req,res)=>{
    const data = await UserService.findUserByTag(req.params.account_number)
    res.json({
        success:true,
        code:200,
        status:"success",
        data
    })
})