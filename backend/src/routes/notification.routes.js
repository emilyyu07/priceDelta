"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../config/prisma"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// GET all notifications for the logged-in user
router.get("/", auth_middleware_1.protect, async (req, res, next) => {
    try {
        const notifications = await prisma_1.default.notification.findMany({
            where: { userId: req.user.id },
            orderBy: { createdAt: "desc" },
        });
        res.json(notifications);
    }
    catch (error) {
        next(error);
    }
});
// MARK a notification as read
router.patch("/:id/read", auth_middleware_1.protect, async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const notification = await prisma_1.default.notification.findUnique({
            where: { id },
        });
        if (!notification) {
            return res.status(404).json({ message: "Notification not found" });
        }
        if (notification.userId !== userId) {
            return res.status(403).json({
                message: "You are not authorized to update this notification",
            });
        }
        const updatedNotification = await prisma_1.default.notification.update({
            where: { id },
            data: { isRead: true },
        });
        res.json(updatedNotification);
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
//# sourceMappingURL=notification.routes.js.map