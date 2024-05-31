
class CustomError extends Error{
  constructor(message,details){
    super(message)
    this.details = details
  }
}
exports.AuthenticationError = class AuthenticationError extends CustomError{
   constructor(message,details){
     super(message,details)
    this.code = 401
   }
}
exports.AuthorizationError = class ValidationError extends CustomError{
  constructor(message,details){
    super(message,details)
   this.code = 403
  }
}
exports.ValidationError = class ValidationError extends CustomError{
  constructor(message,details){
    super(message,details)
   this.code = 422
  }
}