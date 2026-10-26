// utils/token.utils.ts

import jwt, { type JwtPayload } from "jsonwebtoken";
import crypto from "crypto";
import type { AuthRequest } from "./auth.js";
import { setAuthCookies } from "./cookie.js";
import type { Response } from "express";

const accessSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshSecret = process.env.REFRESH_TOKEN_SECRET;
console.log(accessSecret , refreshSecret)

if (!accessSecret || !refreshSecret) {
  throw new Error("JWT secrets are missing");
}

export interface TokenPayload extends JwtPayload {
  sub: string;
  type: "access" | "refresh";
  sessionId?: string;
}

export const generateAccessToken = (userId: number): string => {
  return jwt.sign(
    {
      sub: String(userId),
      type: "access",
    },
    accessSecret,
    {
      expiresIn: "15m",
      issuer: "lenden-backend",
      audience: "lenden-frontend",
    }
  );
};

export const generateRefreshToken = (
  userId: number,
  sessionId: string
): string => {
  return jwt.sign(
    {
      sub: String(userId),
      sessionId,
      type: "refresh",
    },
    refreshSecret,
    {
      expiresIn: "7d",
      issuer: "lenden-backend",
      audience: "lenden-frontend",
    }
  );
};

export const verifyAccessToken = (res :Response , token: string, refreshToken : string) => {
  // try{
    const payload = jwt.verify(token, accessSecret, {
      issuer: "lenden-backend",
      audience: "lenden-frontend",
    }) as TokenPayload;
    return payload


};

export const verifyRefreshToken = (token: string): TokenPayload => {
  const payload = jwt.verify(token, refreshSecret, {
    issuer: "lenden-backend",
    audience: "lenden-frontend",
  }) as TokenPayload;

  if (payload.type !== "refresh" || !payload.sessionId) {
    throw new Error("Invalid refresh token");
  }
  
  return payload;
};

export const hashToken = (token: string): string => {
  return crypto.createHash("sha256").update(token).digest("hex");
};