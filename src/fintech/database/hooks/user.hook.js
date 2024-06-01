const bcrypt = require('bcryptjs')

exports.beforeSave = async function(next){
  try {
   if(this.isModified("password") || this.isNew){
     const hashedPassword = await bcrypt.hash(this.password,12)
     this.password = hashedPassword
     this.updatedAt = new Date()
     return next()
   }
   if(this.isModified("pin")){
    const hashedPin = await bcrypt.hash(this.pin,12)
    this.pin = hashedPin
    this.updatedAt = new Date()
    return next()
  }
   next()
  } catch (error) {
    return next(error)
  }
}