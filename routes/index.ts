
import {Request,Response} from 'express';
import mongoose from "mongoose";
import { AppType } from "../types/types";
const OrderedDbInstance = mongoose.model("ORDERS_SCHEMA");

class Routes{

    getOrderRoutes(app:AppType){

        app.post("/postOrder",async(req:Request,res:Response)=>{
            const availableDb = await OrderedDbInstance.findOne({deviceId:req.body.where.deviceId});
            if (availableDb){
                const availableDbInObjectFormat = availableDb.toObject();
                const availableProducts = [...availableDbInObjectFormat["products"],...req.body.where.products]
                await OrderedDbInstance.replaceOne(availableDbInObjectFormat,{deviceId:req.body.where.deviceId,products:availableProducts})
                res.status(200).json({"status":"updated"})
            }else{
                const orderedDbInstance = new OrderedDbInstance({deviceId:req.body.where.deviceId,products:req.body.where.products});
                orderedDbInstance.save((err,docs)=>{
                    if(!err){
                        res.status(200).json({"status":true})
                    }else{
                        res.status(400).json({"status":false});
                    }
                })
            }
        })

        app.post("/getOrders",(req:Request,res:Response)=>{
            OrderedDbInstance.find((err,docs)=>{
                if (!err){
                    res.status(200).json(docs);
                }else{
                    res.status(400).json([]);
                }
            })
        })
    }
}

module.exports =  new Routes();