import { forgetPassword, loginUser, logout, registerUser, sendOTP, verifyOTP } from "../controllers/AuthControllers.js";
import express from "express"
import { refreshAccessToken } from "../services/RefreshAccessToken.js";


const authRouter = express.Router();

authRouter.post("/user-register" , registerUser);
authRouter.post("/user-login" , loginUser);
authRouter.post("/forget-password" , forgetPassword);
authRouter.post("/send-otp" , sendOTP)
authRouter.post("/verify-otp", verifyOTP)
authRouter.post('/logout-user', logout)
authRouter.post('/refresh' , refreshAccessToken)


export default authRouter