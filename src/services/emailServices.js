import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Create a reusable transporter object using SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Ensure this is set in your .env file
    pass: process.env.EMAIL_PASS, // Ensure this is set in your .env file
  },
});

/**
 * Sends a referral email to the referee.
 * @param {string} referrerEmail - The email of the referrer.
 * @param {string} refereeEmail - The email of the referee.
 * @param {string} course - The course name.
 */
export const sendReferralEmail = async (referrerEmail, refereeEmail, course) => {
  try {
    const mailOptions = {
      from: `"Referral System" <${process.env.EMAIL_USER}>`, // Set sender name
      to: refereeEmail,
      subject: "You've been referred to a course!",
      text: `Hi there!\n\nYou have been referred by ${referrerEmail} to join the course "${course}".\n\nBest regards,\nYour Team`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Referral email sent:", info.response);
    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("Error sending referral email:", error);
    return { success: false, message: "Failed to send email", error };
  }
};

