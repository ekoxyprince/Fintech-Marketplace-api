const bcrypt = require('bcryptjs')

exports.beforeSave = async function(next){
  try {
   if(!this.isModified("password") || !this.isNew) return next()
   const hashedPassword = await bcrypt.hash(this.password,12)
  this.password = hashedPassword
  next()
  } catch (error) {
    return next(error)
  }
}