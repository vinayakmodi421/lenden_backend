import { type Request, type Response } from "express";
import { Expense } from "../models/Expense.js";
import { messageSent } from "../socket/Handler/Messages.js";
import { Message } from "../models/Message.js";
import { GroupMember } from "../models/GroupMember.js";
import { User } from "../models/User.js";
import { Model } from "sequelize";


export const updateExpenses = async (req : Request , res : Response , next : any) : Promise<void> => {
    try{
        const body = {...req.body}
        const id = req.params.id
        console.log(body ,id);
        const data = await Expense.update({
            ...body
        },{
            where : {
                id : id
            }
        })
        console.log(data)
        res.json({
            status : 200,
            message : "expense updated",
            data
        })
        
    }catch(error){
        next(error)
    }
}
export const deleteExpenses = async (req : Request , res : Response , next : any) : Promise<void> => {
    try{
        const id = req.params.id
        const obj : any = {
            deactivated : true,
        }
        console.log(id , obj)
        const data : any = await Expense.update({
            ...obj,
        },{
            where : {
                msgId : id
            }
        })

        const data1 : any = await Message.update({
            ...obj,
        },{
            where : {
                id: id
            }
        })
        console.log(data  , data1)
        res.json({
            status : 200,
            message : "expense deleted"
        })
        
    }catch(error){
        next(error)
    }
}

export const viewExpense = async (req : Request , res : Response , next : any) : Promise<void> => {
    try{
        const msgid = req.params.id;
        const data = await Expense.findOne({
            where : {
                msgId : msgid
            }
        })
        console.log(msgid);
        res.json({
            status : 200,
            message : "full expense object",
            data : data
        })
        
    }catch(error){
        next(error)
    }
}

export const showDashboard = async (req : Request , res : Response , next : any) : Promise<void> => {
    try{
        const id = req.params.id
        const data = await GroupMember.findAll({
            where : {
                groupId : id,
                deactivated : false
            }
            ,include : [
                {model : User, attributes : ["username"] ,as : "user"}
            ]
        })
        console.log(id , data);
        res.json({
            status : 200,
            message : "fetched dashboard",
            data : data
        })
        
    }catch(error){
        next(error)
    }
}
export const showMember = async (req : Request , res : Response , next : any) : Promise<void> => {
    try{
        const id  = req.params.id
        const data = await GroupMember.findAll({
            where : {
                groupId : id,
            },
            include : [
                {model : User, attributes : ["username"] ,as : "user"}
            ]
        })
        console.log(data)
        res.json({
            status : 200,
            message : "fetched members",
            data : data
        })
        
    }catch(error){
        next(error)
    }
}