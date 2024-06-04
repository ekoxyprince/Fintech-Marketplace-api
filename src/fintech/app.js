const express = require('express')
const app = express()
const indexRoute = require('./routes/index.route')
const authRoute = require('./routes/auth.route')
const errorHandler = require("./middlewares/error.middleware")
const userRoute = require("./routes/user.route")
const isAuth = require("./middlewares/auth.middleware")
const {user,admin} = require("./middlewares/role.middleware")
const cors = require("cors")
const helmet = require("helmet")
const logger = require("morgan")

app.use(express.static("public"))
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(logger("dev"))

app.use("/v1",indexRoute)
app.use("/v1/auth",authRoute)
app.use("/v1/user",[isAuth,user],userRoute)
app.use(errorHandler)

module.exports = app