import { PrismaClient } from "@prisma/client";
import { sendReferralEmail } from "../services/emailServices.js"; // Ensure correct path

const prisma = new PrismaClient();

export const createReferral = async (req, res) => {
  try {
    const { referrerName, referrerEmail, refereeName, refereeEmail, course, message } = req.body;

    // Validate required fields
    if (!referrerName || !referrerEmail || !refereeName || !refereeEmail || !course) {
      return res.status(400).json({ error: "All required fields must be filled" });
    }

    // Store referral in database
    const referral = await prisma.referral.create({
      data: { referrerName, referrerEmail, refereeName, refereeEmail, course, message },
    });

    // Send referral email
    try {
      await sendReferralEmail(referrerEmail, refereeEmail, course);
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({ error: "Referral saved, but email could not be sent" });
    }

    res.status(201).json({ message: "Referral submitted successfully!", referral });
  } catch (error) {
    console.error("Error creating referral:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

