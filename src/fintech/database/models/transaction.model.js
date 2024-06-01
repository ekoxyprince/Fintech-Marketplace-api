const _ = require("mongoose")

const _schema = new _.Schema({
    amount:{
        type:Number,
        required:[true,"Amount field cannot be null"],
        default:0.00
    },
    transactionType:{
        type:String,
        enum:['crypto','bank'],
        required:[true,"Transaction type must be provided"]
    },
    flow:{
        type:String,
        enum:['inflow','outflow'],
        required:true
    },
    transactionFlow:{
        type:String,
        enum:['credit','debit'],
        required:true,
        default:function(){
            return this.flow =="inflow"?"credit":"debit"
        }
    },
    transactionStatus:{
        type:String,
        enum:['pending','successful','failed','reversed'],
        require:true
    },
    type:{
        type:String,
        required:true,
    },
    senderDetails:{
        accountNumber:String,
        provider:String,
        accountName:Number,
    },
    receiverDetails:{
        accountNumber:String,
        provider:String,
        accountName:Number,
    },
    userDetails:{
        type:_.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now()
    },
    updatedAt:{
        type:Date,
        required:true,
        default:Date.now()
    }
})