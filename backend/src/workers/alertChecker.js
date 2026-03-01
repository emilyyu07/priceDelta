"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAlerts = void 0;
const prisma_js_1 = __importDefault(require("../config/prisma.js"));
const mail_js_1 = require("../config/mail.js");
const checkAlerts = async (productId, currentPrice) => {
    //convert price to decimal
    const nCurrentPrice = Number(currentPrice);
    //find all alerts where current price falls below target and an alert has yet to be sent
    const eligibleAlerts = await prisma_js_1.default.priceAlert.findMany({
        where: {
            productId: productId,
            targetPrice: { gte: nCurrentPrice },
            isActive: true,
        },
        include: { product: true, user: true },
    });
    for (const alert of eligibleAlerts) {
        //only notify if price is a NEW low or the first time notifying
        const lastPrice = alert.lastNotifiedPrice
            ? Number(alert.lastNotifiedPrice)
            : null;
        const isNewDrop = lastPrice == null || nCurrentPrice < lastPrice;
        if (isNewDrop) {
            try {
                console.log(`Match found for ${alert.userId}! Sending email alert for ${alert.product}`);
                //send email using nodemailer
                await (0, mail_js_1.sendPriceDrop)(alert.user.email, alert.product.title, currentPrice);
                //update PriceAlert and Notification tables in a single transaction (simultaneous)
                await prisma_js_1.default.$transaction([
                    //update alert table
                    prisma_js_1.default.priceAlert.update({
                        where: { id: alert.id },
                        data: {
                            lastNotifiedPrice: currentPrice,
                            lastNotifiedAt: new Date(),
                        },
                    }),
                    //log in nofification table
                    prisma_js_1.default.notification.create({
                        data: {
                            userId: alert.userId,
                            alertId: alert.id,
                            type: "PRICE_DROP",
                            title: "Price Drop Detected!",
                            message: `Great news! The price for ${alert.product.title} dropped to $${currentPrice}.`,
                        },
                    }),
                ]);
                console.log(`Notification cycle complete for alert ${alert.id}.`);
            }
            catch (error) {
                console.error(`Failed to send alert for ${alert.id}:`, error);
            }
        }
        else {
            console.log(`Skipping alert for ${alert.user.email}: Already notified of this price or lower.`);
        }
    }
};
exports.checkAlerts = checkAlerts;
//DELETE LATER ONCE ALERT ROUTING IS CONFIRMED TO WORK SUCCESSFULLY
// export const checkAlerts = async (productId: string, currentPrice: number) => {
//   //find all active alerts for specified product where targetPrice is >= current (targetPrice is met)
//   const alerts = await prisma.priceAlert.findMany({
//     where: {
//       productId: productId,
//       //check if target is greater than or equal to curent
//       targetPrice: { gte: currentPrice },
//       isActive: true,
//     },
//     include: {
//       user: true,
//     },
//   });
//   for (const alert of alerts) {
//     //REPLACE LOG WITH ACTUAL EMAIL SENDING SERVICE LATER
//     console.log(
//       `ALERT: Sending email to ${alert.user.email} for product ${productId}.`
//     );
//     //create notification record in database
//     await prisma.notification.create({
//       data: {
//         userId: alert.userId,
//         alertId: alert.id,
//         type: "PRICE_DROP",
//         title: "Price Drop Detected!",
//         message: `Great news! A product you're watching has dropped to $${currentPrice}.`,
//       },
//     });
//   }
// };
/*
01/04 - important note: remember to replace the console log with an actual email or text
alerting service later on (console.log() is for testing purposes)
*/
/*
01/06 - working on integrating nodemailer to send email alerts
*/
//# sourceMappingURL=alertChecker.js.map