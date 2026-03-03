import nodemailer from "nodemailer";

// transporter (reusable connection pool to gmail)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // smtp.gmail.com
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER, // pricedeltanotif@gmail.com
    pass: process.env.SMTP_PASS, // app pw
  },
});

export const sendPriceDropEmail = async (
  toEmail: string,
  productName: string,
  newPrice: number,
  productUrl: string,
) => {
  try {
    const info = await transporter.sendMail({
      from: `"PriceDelta Alerts" <${process.env.SMTP_USER}>`,
      to: toEmail,
      subject: `🚨 Price Drop: ${productName} is now $${newPrice}!`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Great news from PriceDelta!</h2>
          <p>The item you are tracking just dropped in price.</p>
          <p><strong>${productName}</strong> is now available for <strong>$${newPrice}</strong>.</p>
          <a href="${productUrl}" style="background-color: #0284c7; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 15px;">
            Buy it now
          </a>
          <p style="color: #9ca3af; font-size: 12px; margin-top: 30px;">
            You are receiving this because you set a price alert on PriceDelta.
          </p>
        </div>
      `,
    });
    console.log(
      `[Mailer] Email sent successfully to ${toEmail}. Message ID: ${info.messageId}`,
    );
  } catch (error) {
    console.error(`[Mailer] Failed to send email to ${toEmail}:`, error);
  }
};
