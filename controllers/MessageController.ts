
import { type Request, type Response } from "express";
import { Message } from "../models/Message.js";
import { User } from "../models/User.js";

export const fetchAllMessages = async (req : Request , res : Response , next : any) : Promise<void> => {
    try{
        const id = req.params.id
        const response = await Message.findAll({
            where : {
                groupId : id,
                deactivated: false,
            }
        })

        res.json({
            status : 200,
            message : "Messages fetched",
            data : response
        })
    }catch(error){
        next(error)
    }
}