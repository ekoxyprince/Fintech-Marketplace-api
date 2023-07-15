const mongoose = require('mongoose')

const Schema = mongoose.Schema
const userSchema = new Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    email:{type:String,unique:true,required:true},
    image:String,
    phone:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,required:true},
    createdAt:Date,
    lastLogin:Date,
    account:{
      nairaBalance:Number,
      cryptoBalance:Number,
      accountNumber:Number,
      transferPin:Number,
      portfolio:[
        {
            cryptoName:String,
            cryptoAmount:Number
        }
      ]
    },
    beneficiaries:
        [
            {
               beneficiaryName:String,
               beneficiaryAccount:Number,
               beneficiaryBank:String
            }
        ]
    
})
module.exports = mongoose.model('User',userSchema)