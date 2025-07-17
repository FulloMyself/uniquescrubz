require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

// ✅ CORS setup
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://fullomyself.github.io",
    "https://www.uniquescrubz.co.za",
    "https://uniquescrubz.co.za"
  ],
  methods: ["POST"],
}));

app.use(express.json());

// --- Order Transporter ---
const orderTransporter = nodemailer.createTransport({
  host: "mail.uniqueclothing.co.za",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

// --- Booking Transporter ---
const bookingTransporter = nodemailer.createTransport({
  host: "mail.uniqueclothing.co.za",
  port: 465,
  secure: true,
  auth: {
    user: process.env.BOOKING_MAIL_USER,
    pass: process.env.BOOKING_MAIL_PASSWORD,
  },
});

// --- Admin Transporter ---
const adminTransporter = nodemailer.createTransport({
  host: "mail.uniqueclothing.co.za",
  port: 465,
  secure: true,
  auth: {
    user: process.env.ADMIN_MAIL,
    pass: process.env.ADMIN_PASSWORD,
  },
});

// ✅ --- Events Transporter (NEW) ---
const eventsTransporter = nodemailer.createTransport({
  host: "mail.uniqueclothing.co.za",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EVENTS_MAIL_USER,
    pass: process.env.EVENTS_MAIL_PASSWORD,
  },
});

// ✅ Send Order Confirmation + Admin Notification
app.post("/send-email", async (req, res) => {
  const { name, email, items, total } = req.body;

  const customerMail = {
    from: `"Unique Scrubz Orders" <${process.env.MAIL_USER}>`,
    to: email,
    subject: "Your Unique Scrubz Order Confirmation",
    html: `
      <h2>Thank you for your order, ${name}!</h2>
      <p><strong>Order Summary:</strong> ${items}</p>
      <p><strong>Total:</strong> ${total}</p>
      <p>We'll process your order shortly.</p>
      <small>&copy; ${new Date().getFullYear()} Unique Scrubz</small>
    `,
  };

  const adminMail = {
    from: `"Order Notification" <${process.env.ADMIN_MAIL}>`,
    to: process.env.ADMIN_MAIL,
    subject: `🛒 New Order Received from ${name}`,
    html: `
      <h2>New order received</h2>
      <ul>
        <li><strong>Customer:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Order:</strong> ${items}</li>
        <li><strong>Total:</strong> ${total}</li>
      </ul>
      <small>&copy; ${new Date().getFullYear()} Unique Scrubz</small>
    `,
  };

  try {
    await orderTransporter.sendMail(customerMail);
    await adminTransporter.sendMail(adminMail);
    console.log("✅ Order emails sent (customer & admin)");
    res.status(200).json({ message: "Order emails sent" });
  } catch (err) {
    console.error("❌ Order email error:", err);
    res.status(500).json({ error: "Failed to send order emails", details: err.message });
  }
});

// ✅ Send Appointment Confirmation + Admin Notification
app.post("/send-manufacturing-booking", async (req, res) => {
  const { name, email, phone, message } = req.body;

  const customerMail = {
    from: `"Unique Scrubz Appointments" <${process.env.BOOKING_MAIL_USER}>`,
    to: email,
    subject: "Your Unique Scrubz Manufacturing Appointment Confirmation",
    html: `
      <h2>Thank you, ${name}!</h2>
      <p>Your manufacturing appointment request has been received.</p>
      <ul>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Phone:</strong> ${phone}</li>
        <li><strong>Message:</strong> ${message}</li>
      </ul>
      <small>&copy; ${new Date().getFullYear()} Unique Scrubz</small>
    `,
  };

  const adminMail = {
    from: `"Appointment Notification" <${process.env.ADMIN_MAIL}>`,
    to: process.env.ADMIN_MAIL,
    subject: `📅 New Appointment Request from ${name}`,
    html: `
      <h2>New manufacturing appointment request</h2>
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Phone:</strong> ${phone}</li>
        <li><strong>Message:</strong> ${message}</li>
      </ul>
      <small>&copy; ${new Date().getFullYear()} Unique Scrubz</small>
    `,
  };

  try {
    await bookingTransporter.sendMail(customerMail);
    await adminTransporter.sendMail(adminMail);
    console.log("✅ Booking emails sent (customer & admin)");
    res.status(200).json({ message: "Booking emails sent" });
  } catch (err) {
    console.error("❌ Booking email error:", err);
    res.status(500).json({ error: "Failed to send booking emails", details: err.message });
  }
});

// ✅ --- Send Event Confirmation + Admin Notification (NEW) ---
app.post("/send-event-booking", async (req, res) => {
  const { name, email, event, message } = req.body;

  const customerMail = {
    from: `"Unique Scrubz Events" <${process.env.EVENTS_MAIL_USER}>`,
    to: email,
    subject: `Your Booking for ${event} - Confirmation`,
    html: `
      <h2>Hi ${name},</h2>
      <p>Thank you for booking for <strong>${event}</strong>.</p>
      <p>We have received your request and will contact you shortly.</p>
      <p><strong>Message:</strong> ${message}</p>
      <small>&copy; ${new Date().getFullYear()} Unique Scrubz</small>
    `,
  };

  const adminMail = {
    from: `"Event Notification" <${process.env.ADMIN_MAIL}>`,
    to: process.env.ADMIN_MAIL,
    subject: `🎉 New Event Booking for ${event} from ${name}`,
    html: `
      <h2>New event booking</h2>
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Event:</strong> ${event}</li>
        <li><strong>Message:</strong> ${message}</li>
      </ul>
      <small>&copy; ${new Date().getFullYear()} Unique Scrubz</small>
    `,
  };

  try {
    await eventsTransporter.sendMail(customerMail);
    await adminTransporter.sendMail(adminMail);
    console.log("✅ Event emails sent (customer & admin)");
    res.status(200).json({ message: "Event emails sent" });
  } catch (err) {
    console.error("❌ Event email error:", err);
    res.status(500).json({ error: "Failed to send event emails", details: err.message });
  }
});

// ✅ PORT for Render
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Email server running on port ${PORT}`));
