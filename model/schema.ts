
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    deviceId:{type:String},
    products:[
        {
            id:{type:String},
            productName:{type:String},
            productPrice:{type:String},
            productImage:{type:String},
            available:{type:String}
        }
    ]
})

mongoose.model("ORDERS_SCHEMA",orderSchema);