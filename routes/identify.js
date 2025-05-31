const express = require("express");
const router = express.Router();
const Contact = require("../models/contact");

router.post("/", async (req, res) => {
  const { email, phoneNumber } = req.body;

  if (!email && !phoneNumber) {
    return res.status(400).json({ error: "Email or phone number required" });
  }

  try {
    // 1. Find all contacts with matching email or phone
    const contacts = await Contact.findAll({
      where: {
        [Contact.sequelize.Op.or]: [
          { email },
          { phoneNumber },
        ],
      },
    });

    let primaryContact = null;

    if (contacts.length === 0) {
      // No match found → create a new primary contact
      primaryContact = await Contact.create({
        email,
        phoneNumber,
        linkPrecedence: "primary",
      });
    } else {
      // Match found → find the primary contact
      primaryContact = contacts.reduce((prev, curr) => {
        return prev.createdAt < curr.createdAt ? prev : curr;
      });

      // Create new contact if email/phone is new
      const exactMatch = contacts.find(
        (c) => c.email === email && c.phoneNumber === phoneNumber
      );

      if (!exactMatch) {
        await Contact.create({
          email,
          phoneNumber,
          linkPrecedence: "secondary",
          linkedId: primaryContact.id,
        });
      }
    }

    // Get all related contacts again
    const allContacts = await Contact.findAll({
      where: {
        [Contact.sequelize.Op.or]: [
          { id: primaryContact.id },
          { linkedId: primaryContact.id },
          { id: primaryContact.linkedId }, // just in case
          { linkedId: primaryContact.linkedId },
        ],
      },
    });

    // Find the true primary contact
    const allPrimaries = allContacts.filter((c) => c.linkPrecedence === "primary");
    const truePrimary = allPrimaries.reduce((prev, curr) =>
      prev.createdAt < curr.createdAt ? prev : curr
    );

    const emails = [...new Set(allContacts.map((c) => c.email).filter(Boolean))];
    const phoneNumbers = [...new Set(allContacts.map((c) => c.phoneNumber).filter(Boolean))];
    const secondaryContactIds = allContacts
      .filter((c) => c.linkPrecedence === "secondary")
      .map((c) => c.id);

    res.json({
      contact: {
        primaryContactId: truePrimary.id,
        emails,
        phoneNumbers,
        secondaryContactIds,
      },
    });
  } catch (error) {
    console.error("Error in /identify:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
