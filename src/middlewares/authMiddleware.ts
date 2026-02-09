import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

export interface AuthRequest extends Request {
  userId?: string,
}

const authMiddleware = (request: AuthRequest, response: Response, next: NextFunction) => {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    return response.status(400).json("Não tem token");
  }
  const token = authHeader.replace("Bearer", "").trim();
  jwt.verify(token, env.secret, (err: any, decoded: any) => {
    if (err) {
      return response.status(400).json("Token inválido ou expirado");
    }
    request.userId = decoded.id;
    return next();
  });
}

export default authMiddleware;