
import { Server } from "socket.io";
import cookie from "cookie";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { addMember, messageSent, requestSent } from "./Handler/Messages.js";
import { GroupMember } from "../models/GroupMember.js";
import { Op } from "sequelize";
import { addExpense } from "./Handler/ExpensesHandler.js";
import { findAllGroupMember, findGroupMember } from "./Services/const.js";
import { publishMsgDelivered, publishMsgSeen } from "../services/KafkaProducer.js";


export const initializeSocket = (io: Server , redisClient : any) => {
    //use
    io.use((socket, next) => {
    const accessSecret = process.env.ACCESS_TOKEN_SECRET;
        try {
        const cookieHeader = socket.handshake.headers.cookie;
        if (!cookieHeader) {
            return next(new Error("Unauthorized: No cookies found"));
        }
        const cookies = cookie.parse(cookieHeader);
        const accessToken = cookies.accessToken
        if (!accessToken) {
            return next(new Error("Access token missing"));
        }
        const payload  :any = jwt.verify(accessToken, accessSecret!, {
            issuer: "lenden-backend",
            audience: "lenden-frontend",
        });
        socket.data.userId = Number(payload.sub);
        console.log("authPass")
        next();
        } catch (error) {
            console.log(error)
            next(new Error("Invalid token"));
        }
    });

    io.on("connection", async (socket) => {
        console.log("User connected:", socket.id , socket.data);
        await redisClient.hSet("Users",`userId:${socket.data.userId}`, socket.id);
        socket.on("message", async (data) => {
            console.log("sent")
            const obj = await messageSent(data)
            const id = await findGroupMember(data)
            let userId : any = []
            if(id.length > 0){
                userId = await redisClient.hmGet("Users" ,id);
            }
            userId.forEach((id :any ) => {
                
                io.to(id).emit("text", obj);
            });
        });

        socket.on("request" , async (data) => {
            const userId : any = await redisClient.hGet("Users" ,`userId:${data.receiverUserId}`);
            const noti = await requestSent(data);
            io.to(userId).emit("notification" , noti)
        })

        socket.on("accept" , async (data) => {
            addMember(data);
        })

        socket.on("expense" , async (data) => {
            const id = await findAllGroupMember(data)
            const totalMem = id.length
            const obj = await addExpense(data , totalMem)
            const userId : any = await redisClient.hmGet("Users" ,id);
            console.log(id , data)
            userId.forEach((id :any ) => {
                io.to(id).emit("text", obj.dataValues);
            });
        })

        socket.on("delivered" , async (data) => {
            // console.log(data)
            console.log("deliver")
            await publishMsgDelivered(data)
            return
        })

        socket.on("seen" , async (data) => {
            console.log("seen")
            await publishMsgSeen(data)
        })

        socket.on("disconnect", async (reason  :any) => {
            console.log("User disconnected") , reason;
            await redisClient.hDel("Users", `userId:${socket.data.userId}`);
        });

        socket.on("connect_error", (error) => {
            console.log("❌ SOCKET ERROR:", error.message);
        });
    });
};