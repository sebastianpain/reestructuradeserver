import OrderModel from "../../schemas/orders.schema.js";

export class OrderDAO{
    async getOrders(){
        const orders= await OrderModel.find().lean()
        return orders
    }
    async getOrderById(id){
        const order= await OrderModel.findOne({_id:id}).lean()
        return order
    }
    async createOrder(payload){
        const newOrder= await OrderModel.create(payload)
        return newOrder
    }
}