import { HttpError, HTTP_STATUS } from "../utils/recursos.js";
import { getDAOS } from "../models/daos/index.js";

const { usersDao } = getDAOS();

export class UsersService {
    async getUsers(){
        const users = await usersDao.getUsers();
        return users;

}
    async getUserById(id){
        // Validar que 'id' no sea nulo y sea un número válido
       if(!id|| inNaN(parseInt(id))){
        throw new HttpError('No llego el id',HTTP_STATUS.BAD_REQUEST);
       }
       // Intentar buscar al usuario por 'id'
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
    //Validar el formato del correo electrónico utilizando una expresión regular
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!email.match(emailRegex)) {
        throw new HttpError('El parámetro "id" es obligatorio y no se proporcionó.', HTTP_STATUS.BAD_REQUEST);
    }
    // Resto del código para crear un nuevo usuario
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