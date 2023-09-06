import { UsersService } from "../services/users.service.js"
import { HTTP_STATUS,successResponse } from "../utils/recursos.js"

const userService = new UsersService();

export class UserController{
    static async getUsers(req,res,next){
        try{
        //res.send("ok")
        console.log("1")
        const users= await userService.getUsers()
        const response = successResponse(users)
        res.status(HTTP_STATUS.OK).json(response)
        }catch(error){
            next (error)
        }
    }
    static async getUserById(req,res,next){
        const {uid} = req.params;

        try{
        //res.send("ok")
        const user = await userService.getUserById(uid)
        const response = successResponse(user)
        res.status(HTTP_STATUS.OK).json(response)

        }catch(error){
            next (error)
        }
    }
    static async createUser(req,res,next){
        const userPayload = req.body
        try{
        //res.send("ok")
        const newUser = await userService.createUser(userPayload)
        const response = successResponse(newUser)
        res.status(HTTP_STATUS.OK).json(response)
        
        }catch(error){
            next (error)
        }
    }
}