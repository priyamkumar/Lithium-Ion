import express from "express";
import Contact from "../models/contact.js";

const router = express.Router();

// Submit contact form
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, contactPurpose, message } = req.body;

    if (!name || !email || !phone || !contactPurpose || !message) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const contact = await Contact.create({
      name,
      email,
      phone,
      contactPurpose,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Your message has been received. We will contact you shortly!",
      contact,
    });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
});

// Get all messages
router.get("/", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
});

router.put("/read", async (req, res) => {
  try {
    const { id } = req.body;
    let message = await Contact.findByIdAndUpdate(
      id,
      { read: true },
      { new: true }
    );
    let messages = await Contact.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      message,
      messages
    });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const { id } = req.body;
    await Contact.findByIdAndDelete(id);
    let messages = await Contact.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      messages,
    });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

export default router;
