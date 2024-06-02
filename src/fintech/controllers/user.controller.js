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
exports.updatePin = catchAsync(async(req,res)=>{
    const data = await req.user.updatePin(req.body)
    res.json({
        success:true,
        code:200,
        status:"success",
        data:{
            msg:"Pin updated!"
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
exports.sendMoneyToJJSAccount = catchAsync(async(req,res)=>{
        const data = await req.user.initiateJJSTransfer(req.body)
        res.json({
            success:true,
            code:200,
            status:"success",
            data:data
        })
    })
