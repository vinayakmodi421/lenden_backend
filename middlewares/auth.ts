// middleware/auth.middleware.ts

import type { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "./jwt.js";
import { refreshAccessToken } from "../services/RefreshAccessToken.js";
// import { verifyAccessToken } from "../utils/token.utils.js";

export interface AuthRequest extends Request {
  userId?: number;
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access token missing",
      });
    }
    const con = verifyAccessToken(res, token , refreshToken);
    // console.log("c0nsoleInAuth" , con);
    next();
  } catch(error) {
    // console.log(error)
    return res.json({
      status : 401,
      success: false,
      message: "Access token expired or invalid",
      error
    });
  }
};