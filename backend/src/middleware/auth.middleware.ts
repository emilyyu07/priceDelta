import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";
import "dotenv/config";

const JWT_SECRET = process.env.JWT_SECRET;

interface JwtPayload {
  userId: string;
}

// Define a custom request type that includes the user property
export interface AuthRequest extends Request {
  user?: any;
}

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      if (!JWT_SECRET) {
        return res
          .status(500)
          .json({ message: "Internal server issue: JWT Secret is missing." });
      }
      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: { id: true, email: true, name: true, createdAt: true },
      });

      if (!user) {
        return res
          .status(401)
          .json({ message: "Not authorized, user not found" });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};
