import { OrderDAO } from "./orders/orders.dao.js";
import { UsersDAO } from  "./users/users.dao.js";

const userDao = new UsersDAO();
const ordersDao = new OrderDAO();

export const getDAOS = ()=>{
    return {
        userDao,
       ordersDao
}
}

