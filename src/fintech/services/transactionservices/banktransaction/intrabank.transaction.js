const Transaction = require("../../../database/models/transaction.model")
const {Mutex} = require("async-mutex")
const mutex = new Mutex()
const crypto = require('crypto') 
const {RequestError} = require("../../../exceptions/errors")

module.exports = class BankTransaction{
    constructor(user){
        this.user = user
    }
    async sendToJJSAccount(receiver,body){
        const sender = this.user
         const release = await mutex.acquire()
        try {
        receiver.account['nairaBalance'] = receiver.account['nairaBalance'] + Number(body.amount)
        sender.account['nairaBalance'] = sender.account['nairaBalance'] - Number(body.amount)
        const send = await sender.save()
        const receive = await receiver.save()
        const transaction = await Transaction.create({
         amount:body.amount,transactionStatus:"successful",
         type:"jjs transfer",senderDetails:{
            accountNumber:send.phone,provider:"jjs currency",
            accountName:send.fullname,senderId:send._id
         }, receiverDetails:{
            accountNumber:receive.phone,provider:"jjs currency",
            accountName:receive.fullname,receiverId:receive._id
         }, remark:body.remark,transactionType:"bank",
         reference:crypto.randomBytes(16).toString("hex")
        })
         return transaction
        } catch (error) {
            throw new Error(error)
        } finally{
             release()
        }
    }
    async getUserJJSTransactions(){
        try {
            const userTransactions = await Transaction
            .find({$or:[{'senderDetails.senderId':this.user._id},{'receiverDetails.receiverId':this.user._id}],type:'jjs transfer'})
            .sort('-createdAt')
            return userTransactions
        } catch (error) {
            throw new Error(error)
        }
    }
   static async getTransaction(id){
    try {
        const transaction = await Transaction.findById(id)
        if(!transaction) throw new RequestError("Invalid Transaction Id")
        return transaction
    } catch (error) {
        if(error instanceof RequestError){
            throw new RequestError(error)
           }else{
             throw new Error(error)
           }
    }
   } 
}