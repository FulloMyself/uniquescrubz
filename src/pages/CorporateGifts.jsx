// src/pages/CorporateGifts.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

const base = import.meta.env.BASE_URL;

const images = [
  `${base}images/corporate/corporate1.jpg`,
  `${base}images/corporate/corporate2.jpg`,
  `${base}images/corporate/corporate3.jpg`,
  `${base}images/corporate/corporate4.jpg`,
];

export default function CorporateGifts() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interest: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://email-server-5l9g.onrender.com/send-corporate-interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        alert("Thank you for your interest. We'll be in touch soon.");
        setFormData({ name: "", email: "", interest: "" });
      } else {
        alert("Failed to send your interest. Please try again later.");
        console.error("Error:", result);
      }
    } catch (err) {
      console.error("Submission error", err);
      alert("Something went wrong. Try again later.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
    >
      <div className="pt-28 px-6 max-w-4xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-6">Corporate Gifts</h1>
        <p className="mb-6">
          We supply high-quality corporate gifts for all occasions including Father's Day, Mother's Day, Valentine's Day, and more.
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Our Past Gifts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((img, index) => (
            <div
              key={index}
              className="overflow-hidden rounded shadow-lg group hover:shadow-2xl transition"
              style={{ pointerEvents: "auto" }}
            >
              <img
                src={img}
                alt={`Corporate gift ${index + 1}`}
                className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                draggable="true"
                onClick={(e) => e.preventDefault()}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <div className="mt-16 px-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Show Your Interest</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            value={formData.name}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            value={formData.email}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <textarea
            name="interest"
            placeholder="What are you looking for in a corporate gift?"
            rows={4}
            required
            value={formData.interest}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 rounded"
          >
            Submit Interest
          </button>
        </form>
      </div>

      <Footer />
    </motion.div>
  );
}
