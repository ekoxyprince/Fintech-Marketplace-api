const {check,body,param,query} = require('express-validator')
const User = require('../database/models/user.model')

exports.user = check("email")
.notEmpty()
.withMessage("Email field is required")
.isEmail()
.withMessage("Please Enter a valid Email")
.custom((email,{req})=>{
    return User.findOne({email:email})
    .then(user=>{
        if(user){
            return Promise.reject("Email already exists")
        }
    })
});
exports.email = check("email")
.notEmpty()
.withMessage("Email field is required")
.isEmail()
.withMessage("Please Enter a valid Email")
exports.password = body("password")
.notEmpty()
.withMessage("Password field is required")
.isLength({min:8})
.withMessage('Password must be 8 digits or more')
exports.phone = body("phone")
.notEmpty()
.withMessage("Kindly Provide your phone number")
.isNumeric()
.withMessage("Phone number must include numbers only.")
.custom((value,{req})=>{
    return User.findOne({phone:value})
    .then(user=>{
        if(user){
            return Promise.reject("Number has been registered")
        }
    })
})

