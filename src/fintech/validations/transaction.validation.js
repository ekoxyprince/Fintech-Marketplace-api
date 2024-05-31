const {body} = require("express-validator")
const bcrypt = require("bcryptjs")
const assert = require("assert")


exports.newPin = body("pin")
.notEmpty()
.withMessage("Provide transaction pin")
.isNumeric()
.withMessage("Enter valid pin")
.isLength({min:4})
.withMessage("Enter valid pin")

exports.transPin = body("pin")
.notEmpty()
.withMessage("Provide transaction pin")
.isNumeric()
.withMessage("Enter valid pin")
.isLength({min:4})
.withMessage("Enter valid pin")
.custom((value,{req})=>{
    if(!req.user.getDetails().pin){
        throw new Error("Create a new pin")
    }
    return bcrypt.compare(value,req.user.getDetails().pin)
    .then(match=>{
        if(!match){
           return Promise.reject("Incorrect Pin") 
        }
    })
})
exports.jjsTag = body("account_number")
.notEmpty()
.withMessage("Enter a valid JJS account number")
.isNumeric()
.withMessage("Enter a valid JJS account number")
.isLength({min:10})
.withMessage("Enter a valid JJS account number")
.custom((value,{req})=>{
    assert.equal(value,req.user.getDetails().phone)
    return true
})
