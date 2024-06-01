const User = require('../../database/models/user.model')

module.exports = class UserService{
     constructor(instance){
        this.instance = instance
     }
      async updatePassword(body){
      try {
         this.instance['password'] = body['password']
         await this.instance.save()
      } catch (error) {
         throw new Error(error)
      }
     }
     async updatePin(body){
      try {
         this.instance['pin'] = body['pin']
         await this.instance.save()
         console.log(this.instance)
      } catch (error) {
         throw new Error(error)
      }
     }
    async updateDetails(body){
   try {
      const arr = Object.keys(body)
      for(let i = 0;i<arr.length;i++ ){
      this.instance[arr[i]] = Object.values(body)[i]
      }
      this.instance["updatedAt"] = new Date()
      this.instance["dateOfBirth"] = new Date(body["dob"])
      await this.instance.save()   
   } catch (error) {
    throw new Error(error)  
   }
    }
    static async findUserByTag(tag){
     try {
       const user = await User.findOne({phone:tag}).select({phone:1,fullname:1})
       return user
     } catch (error) {
          throw new Error(error)
     }
    }

}