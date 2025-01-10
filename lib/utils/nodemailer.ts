import nodemailer from "nodemailer";

// Create transporter
export const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

// Verify transporter configuration
export const verifyTransporter = async () => {
  try {
    await transporter.verify();
    console.log("Nodemailer is configured correctly.");
  } catch (error) {
    console.error("Nodemailer configuration error:", error);
  }
};
