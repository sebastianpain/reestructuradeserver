import { Schema, model } from "mongoose";

const collection = 'users'
const schema = new Schema({
    name:{
        type:String,
        requiered:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type:String,
        required: true
        
    },
    orders:[
       { 
        type: Schema.Types.ObjectId,
        ref: 'orders'
        }
    ]


})

const UsersModel = model(collection,schema)

export default UsersModel