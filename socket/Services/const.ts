import { Op } from "sequelize"
import { GroupMember } from "../../models/GroupMember.js"


export const findGroupMember = async (data : any) => {
    const res :any = await GroupMember.findAll({
        where : {
            groupId : Number(data.groupId),
            userId : {
                [Op.ne] : data.userId
            }
        },
        attributes : ["userId"],
    })

    const id = res.map((ele :any ) => {
        return `userId:${ele.dataValues.userId}`
    })
    return id
}
export const findAllGroupMember = async (data : any) => {
    const res :any = await GroupMember.findAll({
        where : {
            groupId : Number(data.groupId),
        },
        attributes : ["userId"],
    })
    const id = res.map((ele :any ) => {
        return `userId:${ele.dataValues.userId}`
    })
    return id
}