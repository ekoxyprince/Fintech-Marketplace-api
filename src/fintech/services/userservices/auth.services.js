const _ = require('lodash')
const User = require("../../database/models/user.model")
const {AuthenticationError} = require('../../exceptions/errors')
const  bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const {jwt_secret} = require('../../config/config')
module.exports = class AuthService{
    static createUser(body){
     let data = _.pick(body,['email','fullname','phone','password'])
      data['role'] = "user"
      return User.create(data)
      .then(user=>user)
      .catch(error=>{
        throw new Error(error)
      })
    }
    static signinUser(body){
      let data = _.pick(body,['email','password'])
      return User.findOne({email:data['email']})
      .then(async(user)=>{
        if(!user|| !await bcrypt.compare(data['password'],user.password)){
          throw new AuthenticationError("Incorrect creditials")
        }
        const token = jwt.sign({id:user._id},jwt_secret)
        return {accessToken:token}
      })
      .catch(error=>{
        if(error instanceof AuthenticationError){
           throw new AuthenticationError(error)
          }else{
            throw new Error(error)
          }
      })
    }
}