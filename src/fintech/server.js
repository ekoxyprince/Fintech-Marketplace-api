const app = require('./app')
const Server = require('http').createServer(app)
const {port} = require('./config/config')
const connectDb = require('./database/config.database')

connectDb()
.then(connected=>{
    Server.listen(port,()=>{
        console.log("Listening on port "+port)
    })
})
.catch(error=>{
    console.error("Error connecting to database",error)
})