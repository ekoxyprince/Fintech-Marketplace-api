module.exports =  {
    port:process.env.PORT|| 8080,
    dbUrl:process.env.DB_URL,
    dbName:process.env.DB_NAME,
    twilioToken:process.env.TWILIO_AUTH_TOKEN,
    twilioSid:process.env.TWILIO_ACCOUNT_SID,
    tokenSecret:process.env.TOKEN_SECRET,
    jwtSecret:process.env.JWT_SECRET,
    jwtExpiresIn:process.env.JWT_EXP_IN
}