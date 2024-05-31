const express = require('express')
const app = express()
const indexRoute = require('./routes/index.route')
const authRoute = require('./routes/auth.route')
const errorHandler = require("./middlewares/error.middleware")

app.use(express.static("public"))
app.use(express.json())

app.use("/v1",indexRoute)
app.use("/v1/auth",authRoute)
app.use(errorHandler)

module.exports = app