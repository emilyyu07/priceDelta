"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPriceDrop = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
//use Ethereal Email for testing emails locally
const sendPriceDrop = async (email, productName, price) => {
    //create a test account
    const testAccount = await nodemailer_1.default.createTestAccount();
    //create transporter
    const transporter = nodemailer_1.default.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass,
        },
    });
    //email content
    const info = await transporter.sendMail({
        from: "Price Engine <alerts@priceengine.com>",
        to: email,
        subject: `Price Drop Alert: ${productName}`,
        text: `Great news! The price of ${productName} has dropped to $${price}. Don't miss out on this deal!`,
        html: `<b>Great news!</b>The price of <strong>${productName}</strong> has dropped to <strong>$${price}</strong>.<br><a href="#">View Product</a>`,
    });
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer_1.default.getTestMessageUrl(info));
};
exports.sendPriceDrop = sendPriceDrop;
//# sourceMappingURL=mail.js.map