const catchAsync = require('../utilities/trycatch')

exports.getUserDetails = catchAsync(async(req,res)=>{
    const data = req.user.instance
    res.json({
        success:true,
        code:200,
        status:"success",
        data
    })
})
exports.updatePassword = catchAsync(async(req,res)=>{
    const data = await req.user.updatePassword(req.body)
    res.json({
        success:true,
        code:200,
        status:"success",
        data:{
            msg:"Password updated!"
        }
    })
})
exports.updateDetails = catchAsync(async(req,res)=>{
    const data = await req.user.updateDetails(req.body)
    res.json({
        success:true,
        code:200,
        status:"success",
        data:{
            msg:"Details updated!"
        }
    })
})