const mongoose = require('mongoose')
const {dbUrl,dbName} = require('../config')

module.exports = function connectedToDB(){
        mongoose.set('strictQuery',true)
        return mongoose.connect(dbUrl,{
            dbName:dbName,
            useNewUrlParser : true,
            useUnifiedTopology : true
        })
}
