
import {Request,Response} from 'express';
import mongoose from "mongoose";
import helper from '../helper/helper';
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

        app.post("/getOrders",async(req:Request,res:Response)=>{
            try{
                const availableDb = await OrderedDbInstance.findOne({deviceId:req.body.where.deviceId});
                const availableDbInObjectFormat = availableDb.toObject();
                res.status(200).json(availableDbInObjectFormat["products"]);
            }catch(err){
                res.status(200).json([]);
            }

        })

        app.delete("/deleteOrder",async(req:Request,res:Response)=>{
            try{
                const availabaleOrderInstance = await OrderedDbInstance.findOne({deviceId:req.body.where.deviceId});
                const availableOrderInstanceInObjectFormat = availabaleOrderInstance.toObject(); 
                const newProductArraay = helper.deleteProduct(availableOrderInstanceInObjectFormat["products"],req.body.where.id);
                const newOrderInstance = {
                    "deviceId":req.body.where.deviceId,
                    "products":newProductArraay
                }
                await OrderedDbInstance.replaceOne(availableOrderInstanceInObjectFormat,newOrderInstance)
                res.status(200).json({"status":true});
            }
            catch(err){
                res.status(400).json({"status":false})
            }
        })
    }
}

module.exports =  new Routes();