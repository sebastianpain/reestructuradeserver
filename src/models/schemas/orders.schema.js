import { Schema, model } from "mongoose";

const collection = 'orders'
const schema = new Schema({
    order_number :{
        type:String,
        required:true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref:'users'
    },
    status:{
        type: String,
        enum:["pending","completed"],
        default:"pending"
    },
    total_price:{
        type:Number,
        default:0
    },
    products:[{
        reference:{type: Schema.Types.ObjectId,
        ref:'products'
    },
    quantity: {type:Number, required: true},
    prince:{ type:Number, required:true},

    }]
})
const OrderModel = model(collection, schema)

export default OrderModel