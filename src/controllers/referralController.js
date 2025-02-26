const { PrismaClient } = require("@prisma/client");
const { sendReferralEmail } = require("../services/emailServices");

const prisma = new PrismaClient();

exports.createReferral = async (req, res) => {
  try {
    const { referrerName, referrerEmail, refereeName, refereeEmail, course, message } = req.body;

    if (!referrerName || !referrerEmail || !refereeName || !refereeEmail || !course) {
      return res.status(400).json({ error: "All required fields must be filled" });
    }

    const referral = await prisma.referral.create({
      data: { referrerName, referrerEmail, refereeName, refereeEmail, course, message },
    });

    await sendReferralEmail(referrerEmail, refereeEmail, course);

    res.status(201).json({ message: "Referral submitted successfully!", referral });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
