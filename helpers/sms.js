const {twilioSid,twilioToken} = require('../config')
const client = require('twilio')(twilioSid,twilioToken)

module.exports =function sendSms(msg,to){
    return client.messages.create({
        body: msg,
        from:'+18149293628',
        to:`${to}`
    })
}
