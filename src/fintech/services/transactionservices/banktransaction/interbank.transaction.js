const axios = require('axios')
const {createRecipient,initialTransfer} = require("../../../utilities/paystack/paystack.transfer")(axios)
const _ = require("lodash")
const {v4:uuidv4} = require("uuid")
const {RequestError} = require("../../../exceptions/errors")

module.exports = class IntrabankService{
    constructor(user){
        this.user = user
    }
     #createBeneficiary(body){
      return new Promise((resolve,reject)=>{
          createRecipient(body)
          .then(createdBeneficiary=>{
            resolve(createdBeneficiary)
          })
          .catch(error=>{
            reject(error)
          })
      })
     }
     #startTransfer(body){
        return new Promise((resolve,reject)=>{
            initialTransfer(body)
            .then(transferDetails=>{
                resolve(transferDetails)
            })
            .catch(error=>{
                reject(error)
            })
        })
     }
    async initiateInterTransfer(body){
     try {
      const reference = uuidv4()
      const beneficiaryData = _.pick(body,['name','bank_code','account_number']) 
      beneficiaryData['type'] = "nuban"
      beneficiaryData['currency'] = "NGN"
      const beneficiary = (await  this.#createBeneficiary(beneficiaryData))['data']['data']
      const transferData = _.pick(body,['remark','amount'])
      transferData['reason'] = transferData['remark']
      transferData['reference'] = reference
      transferData['recipient'] = beneficiary['recipient_code']
      const banktransfer = (await this.#startTransfer(transferData))['data']['data']
      return banktransfer
     } catch (error) {
        if(error.code.includes("BAD_REQUEST")) throw new RequestError(error.response.data.message)
        throw new Error(error)
     }
    }
} 