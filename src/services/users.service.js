import { HttpError, HTTP_STATUS } from "../utils/recursos.js";
import { getDAOS } from "../models/daos/index.js";

const { usersDao } = getDAOS();

export class UsersService {
    async getUsers(){
        const users = await usersDao.getUsers();
        return users;

}
    async getUserById(id){
       if(!id){
        throw new HttpError('No llego el id',HTTP_STATUS.BAD_REQUEST);
       }
       console.log("entregue el id"+id)
       const user = await usersDao.getUsersById(id)
       if(!user){
        throw new HttpError('usuario no encontrado', HTTP_STATUS.NOT_FOUND)
       }
       return user
}
async createUser(payload){
    const {name, email}=payload
    if(!name || !email){
        throw  new HttpError("No llego el nombre o el correo",HTTP_STATUS.BAD_REQUEST);
    }
    const newUser={
        name,
        email,
        role:'USER',
        orders:[] 
    }
    const result = await usersDao.createUser(newUser)
    return result 

}
}