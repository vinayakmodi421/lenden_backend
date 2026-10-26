import { literal } from "sequelize";
import { Expense } from "../../models/Expense.js"
import { Group } from "../../models/Group.js";
import { GroupMember } from "../../models/GroupMember.js";
import { Message } from "../../models/Message.js";
import { Notification } from "../../models/Notification.js";
import { User } from "../../models/User.js";

export const addExpense = async (data : any , totalMem  :any) => {
    console.log(data)
    const name = await User.findOne({
        where : {
            id : data.userId
        },
        attributes : ["username"]
    })
    
    const msgObj : any = {
        groupId : data.groupId,
        text : `${name?.dataValues.username} is paid ${data.amount} for ${data.title}`,
        userId : data.userId,
        status : "sent",
        messageType : "expense",
        deactivated : 0,
    }
    const msg = await Message.create(msgObj)
    const msgRes : any = await Message.findByPk(msg.id, {
        include: [
            { model: User, as: "user", attributes: ["username"] },
        ],
    });
    let obj : any = {
        title: data.title,
        money: data.amount,
        note: data.note,
        location: data.location,
        groupId : data.groupId,
        paidByUserId : data.userId,
        currency : data.currency,
        paymentMode : data.paymentMode,
        tripCompleted : 0,
        deactivated : 0,
        msgId : msgRes.dataValues.id
    }
    const response = await Expense.create(obj);

    const notificationObj : any = {
        userId : data.userId,
        groupId: Number(data.groupId),
        type : "Expense",
        title : "New Expense Added",
        description : `${name?.dataValues.username} is paid ${data.amount} for ${data.title}`,
        isRead : 0,
        deactivated : 0,
        requestId : 0,
        expenseId : response.dataValues.id,
    }
    const res = await Notification.create(notificationObj)

    const amt = data.amount;
    const sharedAmt = amt/totalMem
    console.log(totalMem , amt , sharedAmt , data)
    await GroupMember.update(
        {
            owedAmount: literal(`
                COALESCE(owed_amount, 0) + ${sharedAmt}
            `),

            amountPaid: literal(`
            COALESCE(amount_paid, 0) +
            CASE
                WHEN user_id = ${data.userId} THEN ${amt}
                ELSE 0
            END
            `),
        },
        {
            where: {
            groupId : data.groupId,
            deactivated: false,
            isAccepted: true,
            },
        }
    );
    return msgRes
    
}