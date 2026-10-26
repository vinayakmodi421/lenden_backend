import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

export const sendEmail = async (
  to: string,
  subject: string,
  html: string
) => {
  console.log(process.env.EMAIL_USER, process.env.EMAIL_APP_PASSWORD)
  return transporter.sendMail({
    from: `"My Application" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};