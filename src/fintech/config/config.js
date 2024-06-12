const dotenv = require('dotenv').config({path:'./src/.env'})

module.exports = {
    port:process.env.PORT1,
    database_url:process.env.NODE_ENV == "development"?
    process.env.LOCAL_DB:process.env.REMOTE_DB,
    database_name:process.env.DB_NAME,
    jwt_secret:process.env.JWT_SECRET,
    server:process.env.NODE_ENV == "development"?
    process.env.LOCAL_SERVER+process.env.PORT1:process.env.REMOTE_SERVER,
    paystack_sk:process.env.PAYSTACK_SK_API,
    paystack_pk:process.env.PAYSTACK_PK_API
}