const Mongoose = require('mongoose')
const _ = require('../config/config')

module.exports = async()=>{
  try {
    const connect = await Mongoose.connect(_.database_url,{
        dbName:_.database_name
    })
    if(connect){
    console.log("Connected to database "+_.database_name)
    }else{
    throw new Error("Error conecting to database")
    }
  } catch (error) {
    throw new Error(error)
  }
}