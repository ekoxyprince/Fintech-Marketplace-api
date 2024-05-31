const {validationResult} = require('express-validator')
const { ValidationError } = require('../exceptions/errors')

module.exports = (req,res,next)=>{
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    const error = errors.array()[0]
    throw new ValidationError(error.msg,{...error})
  }else{
    next()
  }
}