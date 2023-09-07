import { OrderDAO } from "./orders/orders.dao.js";
import { UsersDAO } from "./users/users.dao.js";

const usersDao = new UsersDAO();
const ordersDao = new OrderDAO();

export const getDAOS = () => {
  return {
    usersDao,
    ordersDao
  }
}
 