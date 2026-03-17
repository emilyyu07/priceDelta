"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAlertsForProduct = checkAlertsForProduct;
const prisma_js_1 = __importDefault(require("../config/prisma.js"));
const mail_js_1 = require("../config/mail.js");
async function checkAlertsForProduct(productId, newPrice) {
    try {
        const alerts = await prisma_js_1.default.priceAlert.findMany({
            where: {
                productId: productId,
                isActive: true,
            },
            include: {
                user: true,
                product: true,
            },
        });
        for (const alert of alerts) {
            let triggered = false;
            // Check target price condition
            if (alert.targetPrice && newPrice <= Number(alert.targetPrice)) {
                triggered = true;
            }
            if (triggered) {
                // Anti-spam check
                if (alert.lastNotifiedPrice &&
                    Number(alert.lastNotifiedPrice) === newPrice) {
                    console.log(`[Alert Engine] User ${alert.user.email} already notified about $${newPrice}. Skipping.`);
                    continue;
                }
                console.log(`[Alert Engine] 🚨 ALERT TRIGGERED for User ${alert.user.email}!`);
                // Get product URL directly from product model
                const productUrl = alert.product.url || "https://www.aritzia.com";
                // Update the database first
                await prisma_js_1.default.$transaction([
                    prisma_js_1.default.notification.create({
                        data: {
                            userId: alert.userId,
                            alertId: alert.id,
                            type: "PRICE_DROP",
                            title: "Price Drop Alert! 🎉",
                            message: `Great news! ${alert.product.title} has dropped to $${newPrice}!`,
                            isRead: false,
                        },
                    }),
                    prisma_js_1.default.priceAlert.update({
                        where: { id: alert.id },
                        data: {
                            lastNotifiedPrice: newPrice,
                            lastNotifiedAt: new Date(),
                        },
                    }),
                ]);
                // send the email
                if (alert.user.email) {
                    (0, mail_js_1.sendPriceDropEmail)(alert.user.email, alert.product.title, newPrice, productUrl).catch((err) => console.error("Email error:", err));
                }
            }
        }
    }
    catch (error) {
        console.error("[Alert Engine] Failed to check alerts:", error);
    }
}
//# sourceMappingURL=alertChecker.js.map