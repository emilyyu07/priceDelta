"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../config/prisma"));
const library_1 = require("@prisma/client/runtime/library");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// GET all alerts for the logged-in user
router.get("/", auth_middleware_1.protect, async (req, res, next) => {
    try {
        const alerts = await prisma_1.default.priceAlert.findMany({
            where: { userId: req.user.id },
            include: { product: true },
        });
        res.json(alerts);
    }
    catch (error) {
        next(error);
    }
});
// CREATE an alert for the logged-in user
router.post("/", auth_middleware_1.protect, async (req, res, next) => {
    try {
        const { productId, targetPrice } = req.body;
        if (!productId || !targetPrice) {
            return res
                .status(400)
                .json({ message: "productId and targetPrice are required" });
        }
        const alert = await prisma_1.default.priceAlert.create({
            data: {
                userId: req.user.id,
                productId: productId,
                targetPrice: new library_1.Decimal(targetPrice),
                isActive: true,
            },
        });
        res.status(201).json({ success: true, message: "Alert set!", alert });
    }
    catch (error) {
        next(error);
    }
});
// DELETE an alert for the logged-in user
router.delete("/:id", auth_middleware_1.protect, async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({ message: "Invalid alert ID" });
        }
        const alert = await prisma_1.default.priceAlert.findUnique({
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
        await prisma_1.default.priceAlert.delete({
            where: { id },
        });
        res.status(204).send();
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
//# sourceMappingURL=alert.routes.js.map