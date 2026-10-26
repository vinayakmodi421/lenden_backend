import { Group } from "../../models/Group.js";
import { GroupMember } from "../../models/GroupMember.js";
import { Message } from "../../models/Message.js";
import { Notification } from "../../models/Notification.js";
import { Request } from "../../models/Request.js";
import { User } from "../../models/User.js";

export const messageSent = async (data : any) => {
    let obj = {
        ...data,
        deactivated : 0,
    }
    const createdMessage = await Message.create(obj);
    const response = await Message.findByPk(createdMessage.id, {
        include: [
            { model: User, as: "user", attributes: ["username"] },
        ],
    });
    return response?.toJSON()
}

export const requestSent = async (data : any) => {
    const obj : any= {
        senderUserId: data.senderUserId,
        receiverUserId: data.receiverUserId,
        groupId: Number(data.groupId),
        isAdded : 0,
        deactivated : 0,
    }
    const response = await Request.create(obj)

    const notificationObj : any = {
        userId : data.receiverUserId,
        groupId: Number(data.groupId),
        type : "Request",
        title : "Group Invitation",
        description : `${data.senderName} invited you in ${data.groupName} group`,
        isRead : 0,
        deactivated : 0,
        requestId : response.dataValues.id,
        expenseId : 0,
    }
    const response1 = await Notification.create(notificationObj)
    console.log(response1 , "hii ");
    return response1
}

export const addMember = async (data : any) => {
    console.log(data)
    // return;
    const obj : any = {
        isAdmin : 0,
        isAccepted : 1,
        owedAmount : 0,
        amountPaid : 0,
        deactivated : 0,
        userId : data.userId,
        groupId : data.groupId,
    }
    const response = await GroupMember.upsert(obj)

    const increaseGroupMem = await Group.increment({
        totalMembers : 1,
    },{
        where : {
            id : data.groupId,
        }
    })
    console.log(data);

    const response1 = await Request.update({
        isAdded : true
    },{
        where : {
            id : data.requestId
        }
    })
    // console.log(response)
}