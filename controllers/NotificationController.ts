
import { type Request, type Response } from "express";
import { Notification } from "../models/Notification.js";
import { Expense } from "../models/Expense.js";
import { Request as Req } from "../models/Request.js";

export const fetchNotifications = async (req : Request , res : Response , next : any) : Promise<void> => {
    try{
        const id = req.params.id
        let notifications = await Notification.findAll({
            where : {
                userId : id,
                deactivated: false,
            },
              include: [
            {   
                model: Req,
                as: "request",
                required: false,
                },
                {
                model: Expense,
                as: "expense",
                required: false,
                },
            ],
            order: [["createdAt", "DESC"]],
        })
        console.log(notifications[0]?.dataValues)
        res.json({
            status : 200,
            message : "fetched Notifications",
            data : notifications
        })
    }catch(error){
        next(error)
    }
}