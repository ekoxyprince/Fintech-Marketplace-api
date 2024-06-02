const Transaction = require("../../../database/models/transaction.model")
const {Mutex} = require("async-mutex")
const mutex = new Mutex()
const crypto = require('crypto') 

module.exports = class BankTransaction{
    constructor(user){
        this.user = user
    }
    async sendToJJSAccount(receiver,body){
        const sender = this.user
         const release = await mutex.acquire()
        try {
        sender.account['nairaBalance'] = sender.account['nairaBalance'] - Number(body.amount)
        receiver.account['nairaBalance'] = receiver.account['nairaBalance'] + Number(body.amount)
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
}