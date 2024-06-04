const httpProxy = require("http-proxy")
const proxy = httpProxy.createProxyServer()
const server1 = "http://localhost:3000"
const server2 = "http://localhost:3001"
const app = require("express")()
const cors = require("cors")
const helmet = require("helmet")
const logger = require("morgan")

app.use(cors())
app.use(helmet())
app.use(logger("dev"))
app.use("/api/fintech",(req,res)=>{
    console.log(`Incoming request from /api/fintech ${req.method} ${req.url}`)
    proxy.web(req,res,{target:server1},(err)=>{
        if(err){
            console.error("Error forwarding request to service 1",err.message)
            return res.status(500).json({message:"Something went wrong"})
        }
    })
})
app.use("/api/marketplace",(req,res)=>{
    console.log(`Incoming request from /api/marketplace ${req.method} ${req.url}`)
    proxy.web(req,res,{target:server2},(err)=>{
        if(err){
            console.error("Error forwarding request to service 2",err.message)
            return res.status(500).json({message:"Something went wrong"})
        }
    })
})
app.use((req,res)=>{
    res.status(404).json({
        message:"Not Found"
    })
})
proxy.on("proxyReq",(proxyReq,req,res,options)=>{
    console.log("Received request to "+options.target.href+":"+req.method+" "+req.url)
})
const Server = require("http").createServer(app)
Server.listen(8080,()=>{
    console.log("Listening on port 8080")
})
