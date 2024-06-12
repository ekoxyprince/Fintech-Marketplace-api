const UserService = require('../services/userservices/user.services')
const BankService = require('../services/transactionservices/banktransaction/intrabank.transaction')
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
exports.findTransaction = catchAsync(async(req,res)=>{
    const data = await BankService.getTransaction(req.params.id)
    res.json({
        success:true,
        code:200,
        status:"success",
        data
    })
})