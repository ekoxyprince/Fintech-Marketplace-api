const dotenv = require('dotenv').config({path:'./src/.env'})

module.exports = {
    port:process.env.PORT2,
    database_url:process.env.NODE_ENV == "development"?
    process.env.LOCAL_DB:process.env.REMOTE_DB,
    database_name:process.env.DB_NAME,
    jwt_secret:process.env.JWT_SECRET
}