// src/pages/Events.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

const base = import.meta.env.BASE_URL;

const images = [
  `${base}images/events/Sip_And_Paint.jpg`,
];

export default function Events() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // ✅ NEW: Selected image state for popup modal
  const [selectedImage, setSelectedImage] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    setIsSubmitting(true);
    e.preventDefault();

    try {
      const res = await fetch(
        "https://email-server-5l9g.onrender.com/send-manufacturing-booking",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone + " (Events Inquiry)",
            message: formData.message,
          }),
        }
      );

      const result = await res.json();

      if (res.ok) {
        alert(
          "Thank you for your interest in our Events. We'll be in touch soon."
        );
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        alert("Failed to send your interest. Please try again later.");
        console.error("Error:", result);
      }
    } catch (err) {
      console.error("Submission error", err);
      alert("Something went wrong. Try again later.");
    } finally {
      setIsSubmitting(false);
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
        <h1 className="text-3xl font-bold mb-6">Unique Scrubz Events</h1>
        <p className="mb-6">
          Stay updated on our exciting events – from fashion shows and product
          launches to workshops and pop-up shops.
        </p>
      </div>

      {/* ✅ Gallery Grid */}
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Past & Upcoming Events
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(img)}
              className="focus:outline-none"
            >
              <img
                src={img}
                alt={`Event ${idx + 1}`}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  background: "#caa92a",
                  borderRadius: "0.5rem",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  cursor: "pointer",
                }}
                className="transition-transform duration-300 hover:scale-105"
                draggable="false"
              />
            </button>
          ))}
        </div>
      </div>

      {/* ✅ Popup Modal for Image */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="bg-white rounded-lg p-4 max-w-3xl w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
            >
              ✕
            </button>
            <img
              src={selectedImage}
              alt="Event Large View"
              className="rounded-md mx-auto"
              style={{
                width: "100%",
                maxHeight: "80vh",
                objectFit: "contain",
                background: "#caa92a",
              }}
            />
          </div>
        </div>
      )}

      {/* Contact Form */}
      <div className="mt-16 px-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Show Your Interest
        </h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Your Name"
            required
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Your Email"
            required
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="tel"
            name="phone"
            id="phone"
            placeholder="Your Phone"
            autoComplete="tel"
            value={formData.phone}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <textarea
            name="message"
            id="message"
            placeholder="Your Message"
            autoComplete="off"
            value={formData.message}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <button
            type="submit"
            className={`bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 rounded transition ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Interest"}
          </button>
        </form>
      </div>

      <Footer />
    </motion.div>
  );
}
