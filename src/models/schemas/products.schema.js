import { Schema, model} from "mongoose";

const collection = 'products'
const schema = new Schema({
    tittle:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
        unique:true
    },
    stock:{
        type:Number,
        required:true
        
    },
    
})
const ProductsModel = model(collection, schema)

export default ProductsModel