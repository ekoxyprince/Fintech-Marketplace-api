const Transaction = require("../../../database/models/transaction.model")
module.exports = class BankTransaction{
    constructor(user){
        this.user = user
    }
    async sendToJJSAccount(receiver){
        
    }
}