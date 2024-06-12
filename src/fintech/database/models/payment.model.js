const _ = require('mongoose')

const _schema  = new _.Schema({
    reference:{
        type:String,
        required:[true,"Reference number required"],
    },
    amount:{
        type:Number,
        required:true
    },
    currency:{
        type:String,
        required:true
    },
    channel:String,
    status:{
        type:String,
        required:true
    },
    paidAt:Date,
    createdAt:{
        type:Date,
        default:new Date()
    },
    updatedAt:{
        type:Date,
        default:new Date()
    }

})