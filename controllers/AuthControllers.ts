import { type Request, type Response } from "express";
import { User } from "../models/User.js";
import { generateOTP } from "../services/Const.js";
import { sendEmail } from "../services/Mailer1.js";
import { Otp } from "../models/Otp.js";
import { generateAccessToken, generateRefreshToken, hashToken, verifyRefreshToken } from "../middlewares/jwt.js";
import { RefreshToken } from "../models/Token.js";
import { clearAuthCookies, setAuthCookies } from "../middlewares/cookie.js";

export const registerUser = async (req : Request , res : Response , next : any) : Promise<void> => {
    try{
        const body = {...req.body}
        body.isEmailVerified = 0;
        body.deactivated = 0;
        console.log(body)
        const response = await User.create(body);
        console.log(response)
        res.json({
            status : 200,
            message : "user register successfully",
            
        })
    }
    catch(error){
        next(error)
    }
}

export const loginUser = async (req : Request , res : Response , next : any) : Promise<void> => {
    try{
        const body = {...req.body}
        const user = await User.findOne({
            where : {
                ...body,
                deactivated: false,
            }
        })
        // console.log(user)
        if(!user){
            res.json({
                status : 400,
                message : "Forget password..."
            });
            return;
        }

        const sessionId = crypto.randomUUID();
        const accessToken = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(user.id, sessionId);

        const [updatedCount] = await RefreshToken.update({
            isActive : false,
            },{
                where : {
                    isActive : 1,
                    userId : user.id,
                }
            }
        )
        const dumy = await RefreshToken.create({
            id : sessionId,
            userId: user.id,
            refreshToken: hashToken(refreshToken),
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            isActive: true,
        });

        setAuthCookies(res , accessToken , refreshToken);
        res.json({
            status : 200,
            message : "login successfully",
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
            },
        })
    }
    catch(error){
        console.log(error)
        next(error)
    }
}

export const forgetPassword = async (req : Request , res : Response , next : any) : Promise<void> => {
    try{

    }
    catch(error){
        next(error)
    }
}
export const sendOTP = async (req : Request , res : Response , next : any) : Promise<void> => {
    try{
        const body = {...req.body}
        const otp = generateOTP()
        const subject = "opt verification"
        const message = `your opt for lenden is ${otp}`
        const obj : any = {
            email :  body.email,
            otp : otp,
            otpExpiry : 0,
        }
        console.log(body.email, otp,subject , message);
        const data = await Otp.create(obj);
        sendEmail(body.email , subject , message)
        res.json({
            status : 200,
            messsage : "opt sended"
        })
    }
    catch(error){
        next(error)
    }
}
export const verifyOTP = async (req : Request , res : Response , next : any) : Promise<void> => {
    try{
        const body = {...req.body}
        const isCheck = await Otp.findOne({
            where : {
                ...body,
                deactivated: false,
            }
        })
        console.log(isCheck, body)
        if(isCheck){
            // await 
            res.json({
                status : 200,
                messsage : "OTP verified",
                success : true,
            })
        }else{
            res.json({
                status : 400,
                message : "OTP is incorrect",
                success : false,
            })
        }
    }
    catch(error){
        next(error)
    }
}

export const logout = async (req : Request , res : Response , next : any) : Promise<void> => {
    try{
        const refreshToken = req.cookies.refreshToken;

        if (refreshToken) {
            try {
            const payload = verifyRefreshToken(refreshToken);

            await RefreshToken.update(
                { isActive : false },
                {
                    where: {
                        id: payload.sessionId,
                    },
                }
            );
            } catch {
                
            // Cookie still clear hogi
            }
        }

    clearAuthCookies(res);

        res.status(200).json({
            success: true,
            message: "Logout successful",
        });
    }
    catch(error){
        next(error)
    }
}

