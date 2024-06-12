const User = require('../../database/models/user.model')
const BankService = require("../transactionservices/banktransaction/intrabank.transaction")
const InterbankService = require("../transactionservices/banktransaction/interbank.transaction")
const {RequestError} = require("../../exceptions/errors")

module.exports = class UserService{
     constructor(instance){
        this.instance = instance
     }
      async updatePassword(body){
      try {
         this.instance['password'] = body['password']
         await this.instance.save()
      } catch (error) {
         throw new Error(error)
      }
     }
     async updatePin(body){
      try {
         this.instance['pin'] = body['pin']
         await this.instance.save()
         console.log(this.instance)
      } catch (error) {
         throw new Error(error)
      }
     }
    async updateDetails(body){
   try {
      const arr = Object.keys(body)
      for(let i = 0;i<arr.length;i++ ){
      this.instance[arr[i]] = Object.values(body)[i]
      }
      this.instance["updatedAt"] = new Date()
      this.instance["dateOfBirth"] = new Date(body["dob"])
      await this.instance.save()   
   } catch (error) {
    throw new Error(error)  
   }
    }
    static async findUserByTag(tag){
     try {
       const user = await User.findOne({phone:tag}).select({phone:1,fullname:1})
       return user
     } catch (error) {
          throw new Error(error)
     }
    }
    async initiateJJSTransfer(body){
      try {
         const bankService = new BankService(this.instance)
         const receiver = await User.findOne({phone:body.account_number})
         const transaction = await bankService.sendToJJSAccount(receiver,body)
         return transaction
       } catch (error) {
            throw new Error(error)
       }
    }
    async getJJSTransactions(){
      try {
         const bankService = new BankService(this.instance)
         const transactions =await bankService.getUserJJSTransactions()
         return transactions
      } catch (error) {
         throw new Error(error)
      }
    }
    async initiateBankTransfer(body){
      try {
         const interbankService = new InterbankService(this.instance)
         const transaction = await interbankService.initiateInterTransfer(body) 
         return transaction
      } catch (error) {
         if(error instanceof RequestError) throw new RequestError(error)
         throw new Error(error)
      }
    }

}