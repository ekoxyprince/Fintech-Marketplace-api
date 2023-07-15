const app = require('./app')
const http = require('http')
const {port} = require('./config')
const connectToDb = require('./utils/database')
const server = http.createServer(app)

connectToDb()
.then(connected=>{
    console.log('connected to database')
    server.listen(port,()=>{
    console.log(`Server listening on port ${port}`)
    })
})
.catch(error=>{
    console.log(error)
})



