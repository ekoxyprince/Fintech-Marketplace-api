const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const dotenv = require('dotenv').config()
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')
const authApi = require('./routes/auth')

app.use(express.json())
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())
app.use(helmet())
app.use(compression())

app.use('/api/auth',authApi)

module.exports = app