


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

}