import { type Request, type Response } from "express";
import { Group } from "../models/Group.js";
import { group } from "node:console";
import { Message } from "../models/Message.js";
import { User } from "../models/User.js";
import { NUMBER, Op } from "sequelize";
import { GroupMember } from "../models/GroupMember.js";
import { messageSent } from "../socket/Handler/Messages.js";
export const searchUser = async (req : Request , res : Response , next : any) : Promise<void> => {
    try{
        const query = req.query
        const username = query.username
        const response = await User.findAll({
            where : {
                username : {
                    [Op.like] : `%${username}%`
                },
                deactivated: false,
            },
            attributes: ["id", "username", "email"],
            limit : 10
        })
        // console.log(response)
        if(!response) res.json({status : 300 , message : "account not found"})
        res.json({
            status : 200,
            message : "account found",
            data : response
        })
    }catch(error){
        next(error)
    }
}
export const createGroup = async (req : Request , res : Response , next : any) : Promise<void> => {
    try{
        let data = req.body;

        data.deactivated = 0;
        data.totalMembers = 1;
        const response = await Group.create(data)

        const obj : any = {
            userId : Number(response.dataValues.adminId),
            groupId : Number(response.dataValues.id),
            isAdmin : 1,
            isAccepted : 1,
            owedAmount : 0,
            amountPaid : 0,
            deactivated : 0,
        }

        const groupMem = await GroupMember.create(obj)
        // console.log(groupMem)
        res.json({
            success : 200,
            message : "group created",
        })
        
    }catch(error){
        next(error)
    }
}
export const modifyGroup = async (req : Request , res : Response , next : any) : Promise<void> => {
    try{
        res.json()
        
    }catch(error){
        next(error)
    }
}
export const deactivateGroup = async (req : Request , res : Response , next : any) : Promise<void> => {
    try{
        res.json()
        
    }catch(error){
        next(error)
    }
}
export const requestToJoin = async (req : Request , res : Response , next : any) : Promise<void> => {
    try{
        res.json()
        
    }catch(error){
        next(error)
    }
}

export const fetchGroups = async (req : Request , res : Response , next : any) : Promise<void> => {
    try{
        const id = req.params.id
        const response = await GroupMember.findAll({
            where : {
                userId : id,
                deactivated: false,
            },
            include :[
                {
                    model : Group,
                    as : "group",
                    where: { deactivated: false },
                    include : [
                        {
                            model : Message,
                            as : "lastMessage"
                        }
                    ]
                },
            ],
            attributes : ["isAdmin", "userId"]
        })
        res.json({
            status : 200,
            message : "groups fetched",
            data : response
        })
        
    }catch(error){
        next(error)
    }
}

export const exitGroupMember = async (req : Request , res : Response , next : any) : Promise<void> => {
    try{
        const id : any = req.params.id
        const response :  any  = await GroupMember.update({
            deactivated : true,
        },
        {
            where : {
                id : id
            },
            returning : true
        },
        )
        const d = await GroupMember.findByPk(id);
        console.log(d)
        // const grou
        const decrementGroupMem = await Group.increment({
            totalMembers : -1,
        },{
            where : {
                id : d?.dataValues.groupId,
            }
        })

        res.json({
            status : 200,
            message : "member deactivated"
        })
    }catch(error){
        next(error)
    }
}