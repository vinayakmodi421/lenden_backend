import type { Request, Response } from "express";
import { generateAccessToken, hashToken, verifyRefreshToken } from "../middlewares/jwt.js";
import { RefreshToken } from "../models/Token.js";
import { clearAuthCookies, setAuthCookies } from "../middlewares/cookie.js";

export const refreshAccessToken = async (
  req: Request,
  res: Response
) => {
  try {
    const oldRefreshToken = req.cookies.refreshToken;

    if (!oldRefreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token missing",
      });
    }

    const payload = verifyRefreshToken(oldRefreshToken);
    const userId = Number(payload.sub);
    const incomingHash = hashToken(oldRefreshToken);

    const session = await RefreshToken.findOne({
      where: {
        id: payload.sessionId,
        userId,
        isActive: true,
      },
    });
    // console.log(session , payload , oldRefreshToken);
    if (!session) {
      clearAuthCookies(res);
      return res.status(401).json({
        success: false,
        message: "Refresh token expired or invalid",
      });
    }

    const storedHash = session.refreshToken;
    const expiresAt = new Date(session.expiresAt);

    if (storedHash !== incomingHash || expiresAt <= new Date()) {
      clearAuthCookies(res);
      return res.status(401).json({
        success: false,
        message: "Refresh token expired or invalid1",
      });
    }

    const newAccessToken = generateAccessToken(userId);
    setAuthCookies(res, newAccessToken, oldRefreshToken);

    return res.json({
      success: true,
      message: "Tokens refreshed",
    });
  } catch (error) {
    clearAuthCookies(res);

    return res.status(401).json({
      success: false,
      message: "Refresh token expired or invalid2",
      error,
    });
  }
};