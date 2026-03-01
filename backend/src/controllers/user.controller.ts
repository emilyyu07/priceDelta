import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth.middleware";
import prisma from "../config/prisma";

export const getMe = async (req: AuthRequest, res: Response) => {
  res.status(200).json(req.user);
};

export const updateUser = async (
  req: AuthRequest,
  res: Response,
  next: Function,
) => {
  try {
    const { id } = req.user; // Get user ID from authenticated request
    const { name } = req.body; // Get name from request body

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { name },
      select: { id: true, email: true, name: true }, // Select fields to return
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error); // Pass error to global error handler
  }
};
