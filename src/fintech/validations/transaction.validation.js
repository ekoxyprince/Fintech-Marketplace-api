const {body,check,param} = require("express-validator")
const bcrypt = require("bcryptjs")
const User = require("../database/models/user.model")



exports.newPin = body("pin")
.notEmpty()
.withMessage("Provide transaction pin")
.isNumeric()
.withMessage("Enter valid pin")
.isLength({min:4,max:4})
.withMessage("Pin must be 4 digits")

exports.transPin = body("pin")
.notEmpty()
.withMessage("Provide transaction pin")
.isNumeric()
.withMessage("Enter valid pin")
.isLength({min:4})
.withMessage("Enter valid pin")

.custom((value,{req})=>{
   return User.findById(req.user.instance.id)
    .then(user=>{
       if(!user?.pin){
        return Promise.reject("Pin required") 
       }
    return bcrypt.compare(String(value),user.pin)
    .then(match=>{
        if(!match){
           return Promise.reject("Incorrect Pin") 
        }
    })
    })
})
exports.jjsTag = check("account_number")
.notEmpty()
.withMessage("Enter a valid JJS account number")
.isNumeric()
.withMessage("Enter a valid JJS account number")
.isLength({min:9})
.withMessage("Enter a valid JJS account number length")
.custom((value,{req})=>{
    if(value == req.user.instance.phone){
        throw new Error("Invalid transaction")
    }
    return true
})
.custom((value,{req})=>{
   return User.findOne({phone:value})
    .then(user=>{
        if(!user){
           return  Promise.reject("Enter a valid JJS account number")
        }
    })
})
exports.transAmount = body("amount")
.notEmpty()
.withMessage("Amount field cannot be empty")
.isNumeric()
.withMessage("Invalid amount value")
.custom((value,{req})=>{
    if(value == 0){
        throw new Error("Amount cannot be 0")
    }else if(value>req.user.instance.account.nairaBalance){
        throw new Error("Insufficient balance")
    }else{
        return true
    }
})
exports.transId = param("id")
.notEmpty()
.withMessage("Enter a valid Transaction Id")
.isAlphanumeric()
.withMessage("Enter a valid Transaction Id")
.isLength({min:24})
.withMessage("Enter a valid Transaction Id")


