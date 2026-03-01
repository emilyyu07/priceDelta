import { Router } from "express";
import prisma from "../config/prisma";
import { Decimal } from "@prisma/client/runtime/library";
import { protect } from "../middleware/auth.middleware";
import type { AuthRequest } from "../middleware/auth.middleware";

const router = Router();

// GET all alerts for the logged-in user
router.get("/", protect, async (req: AuthRequest, res, next) => {
  try {
    const alerts = await prisma.priceAlert.findMany({
      where: { userId: req.user.id },
      include: { product: true },
    });
    res.json(alerts);
  } catch (error) {
    next(error);
  }
});

// CREATE an alert for the logged-in user
router.post("/", protect, async (req: AuthRequest, res, next) => {
  try {
    const { productId, targetPrice } = req.body;

    if (!productId || !targetPrice) {
      return res
        .status(400)
        .json({ message: "productId and targetPrice are required" });
    }

    const alert = await prisma.priceAlert.create({
      data: {
        userId: req.user.id,
        productId: productId,
        targetPrice: new Decimal(targetPrice),
        isActive: true,
      },
    });

    res.status(201).json({ success: true, message: "Alert set!", alert });
  } catch (error) {
    next(error);
  }
});

// DELETE an alert for the logged-in user
router.delete("/:id", protect, async (req: AuthRequest, res, next) => {
  try {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({ message: "Invalid alert ID" });
    }

    const alert = await prisma.priceAlert.findUnique({
      where: { id },
    });

    if (!alert) {
      return res.status(404).json({ message: "Alert not found" });
    }

    if (alert.userId !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this alert" });
    }

    await prisma.priceAlert.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
