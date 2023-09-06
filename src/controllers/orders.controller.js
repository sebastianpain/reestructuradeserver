
import { OrderService } from "../services/orders.service.js"
import { HTTP_STATUS, successResponse } from "../utils/recursos.js"

const orderService= new OrderService()
export class OrdersController{

    static async getOrders(req,res,next){
        try{
            const orders= await orderService.getOrders()
            const response= successResponse(orders)
        res.status(HTTP_STATUS.OK).json(response)
        }catch(error){
            next (error)
        }
    }
    static async getOrderById(req,res,next){
        try{
            const orders = await OrderService.getOrders()
            const response = successResponse(orders)
        res.status(HTTP_STATUS.OK).json(response)
        }catch(error){
            next (error)
        }
    }
    static async createOrder(req,res,next){
        try{
        res.send("ok")
        }catch(error){
            next (error)
        }
    }
}

