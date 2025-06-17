// Manufacturing.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

export default function Manufacturing() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://email-server-5l9g.onrender.com/send-manufacturing-booking", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(formData),
});

      const data = await res.json();

      if (res.ok) {
        alert("✅ Appointment booked successfully!");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        alert("❌ Failed to send booking. Please try again later.");
        console.error(data.error);
      }
    } catch (err) {
      console.error("Client error:", err);
      alert("❌ An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.5 }}
      >
        <div className="pt-24 pb-8 px-4 max-w-3xl mx-auto min-h-[80vh]">
          <h1 className="text-3xl font-bold mb-6">Book a Manufacturing Appointment</h1>
          <p className="mb-4">
            Please fill out the form below to schedule a consultation about your manufacturing needs.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              value={formData.name}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              value={formData.email}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              required
              value={formData.phone}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <textarea
              name="message"
              placeholder="Describe your manufacturing needs"
              rows={5}
              required
              value={formData.message}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 rounded disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Sending..." : "Book Appointment"}
            </button>
          </form>
        </div>
      </motion.div>
      <Footer />
    </>
  );
}
