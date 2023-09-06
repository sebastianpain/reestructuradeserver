import UsersModel from "../../schemas/users.schema.js";

export class UsersDAO{
    async getUsers(){
        const users= await UsersModel.find().lean()
        return users
    }
    async getUsersById(id){
        const user = await UsersModel.findOne({_id:id}).lean()
        return user
    }
    async createUser(payload){
        const newUser= await UsersModel.create(payload)
        return newUser
    }
}