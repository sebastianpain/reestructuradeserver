import { getDAOS } from "../models/daos/index.js";
import { HttpError, HTTP_STATUS } from "../utils/recursos.js";

const { ordersDao, usersDao } = getDAOS();

export class OrderService {
    async getOrders(){
        const orders = await ordersDao.getOrders();
        return orders;

}
async getOrderById(id){
    if(!id){
     throw new HttpError('No llego el id',HTTP_STATUS.BAD_REQUEST);
    }
    console.log("entregue el id"+id)
    const order = await ordersDao.getOrderById(id)
    if(!order){
     throw new HttpError('usuario no encontrado', HTTP_STATUS.NOT_FOUND)
    }
    return order;
}
async createOrder(payload){
const {user,products}=payload

const userDB = await usersDao.getUsersById(user)
if (!userDB){
    throw new HttpError('No llego el id',HTTP_STATUS.NOT_FOUND);
}
const bussiness="N/A"
const totalPrice=0
const order_number= Date.now()

const newOrder ={
    order_number,
    bussiness,
    user,
    status:'pending',
    products:[],
    totalPrice: totalPrice
}
const newOrderPay = await ordersDao.createOrder(newOrder)
return newOrderPay
}
}
