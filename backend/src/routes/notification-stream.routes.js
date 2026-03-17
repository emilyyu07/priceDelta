"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_js_1 = __importDefault(require("../config/prisma.js"));
const auth_middleware_js_1 = require("../middleware/auth.middleware.js");
const router = (0, express_1.Router)();
// Server-Sent Events endpoint for real-time notifications
router.get("/", auth_middleware_js_1.protect, (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Not authorized, user not found" });
    }
    const userId = req.user.id;
    const frontendOrigin = process.env.FRONTEND_URL || "http://localhost:5173";
    // Set headers for SSE
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': frontendOrigin,
        'Access-Control-Allow-Headers': 'Cache-Control'
    });
    // Send initial connection message
    res.write(`data: ${JSON.stringify({ type: 'connected', message: 'Connected to notification stream' })}\n\n`);
    // Function to send notifications
    const sendNotification = async () => {
        try {
            const notifications = await prisma_js_1.default.notification.findMany({
                where: {
                    userId: userId,
                    isRead: false
                },
                orderBy: { createdAt: 'desc' },
                take: 10
            });
            res.write(`data: ${JSON.stringify({ type: 'notifications', data: notifications })}\n\n`);
        }
        catch (error) {
            console.error('[Notification Stream] Error fetching notifications:', error);
        }
    };
    // Initial fetch
    sendNotification();
    // Set up polling every 30 seconds
    const interval = setInterval(sendNotification, 30000);
    // Clean up on client disconnect
    req.on('close', () => {
        clearInterval(interval);
        console.log(`[Notification Stream] User ${userId} disconnected`);
    });
});
exports.default = router;
//# sourceMappingURL=notification-stream.routes.js.map