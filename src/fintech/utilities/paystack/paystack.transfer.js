const {paystack_pk,paystack_sk} = require("../../config/config")
const baseUrl = 'https://api.paystack.co'
const options = {
    headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${paystack_sk}`
    }
} 

module.exports = paystackTransfer = (request)=>{
   const createRecipient = (body)=>{
    return request.post(`${baseUrl}/transferrecipient`,body,options)
     }
     const initialTransfer = (body)=>{
        return request.post(`${baseUrl}/transfer`,body,options)
     }
     const verifyTransfer = (query)=>{
        return request.get(`${baseUrl}/transaction/verify/${encodeURIComponent(query)}`)
     }
     return {createRecipient,initialTransfer,verifyTransfer}
}