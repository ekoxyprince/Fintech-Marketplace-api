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
        senderId:{
            type:_.Schema.Types.ObjectId,
            ref:'User',
            required:function(){
                return this.transactionType =="jjs transfer"
            }
        },
        accountNumber:Number,
        provider:String,
        accountName:String,
    },
    receiverDetails:{
        receiverId:{
            type:_.Schema.Types.ObjectId,
            ref:'User',
            required:function(){
                return this.transactionType =="jjs transfer"
            }
        },
        accountNumber:Number,
        provider:String,
        accountName:String,
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
    },
    remark:String,
    reference:{
        type:String,
        required:true,
        unique:true
    }
})

module.exports = _.model("Transaction",_schema)