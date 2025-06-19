// src/pages/CorporateGifts.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/Footer";

const base = import.meta.env.BASE_URL;

const images = [
  `${base}images/corporategifts/slippers1.jpg`,
  `${base}images/corporategifts/slippers2.jpg`,
  `${base}images/corporategifts/fleececup.jpg`,
  `${base}images/corporategifts/dadgown.jpg`,
  `${base}images/corporategifts/thermalmug.jpg`,
  `${base}images/corporategifts/FathersDay.jpg`,
];

export default function CorporateGifts() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interest: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    setIsSubmitting(true);
    e.preventDefault();

    try {
      const res = await fetch("https://email-server-5l9g.onrender.com/send-manufacturing-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: "Gift Inquiry",
          message: formData.interest,
        }),
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
        <h1 className="text-3xl font-bold mb-6">Corporate Gifts</h1>
        <p className="mb-6">
          We supply high-quality gifts for all occasions including Father's Day, Mother's Day, Valentine's Day, and more.
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Our Past Gifts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt=""
              style={{
                cursor: "not-allowed",
                width: "100%",
                height: "200px",
                objectFit: "contain",
                background: "#caa92a",
                borderRadius: "0.5rem",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
              }}
              className="transition-transform duration-300 hover:scale-105"
              draggable="true"
              onClick={(e) => {
                e.preventDefault();
                toast.info("To view image options, please right click on the image.", {
                  position: "top-center",
                  autoClose: 2500,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                });
              }}
            />
          ))}
        </div>
        <ToastContainer />
      </div>

      {/* Contact Form */}
      <div className="mt-16 px-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Show Your Interest</h2>
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
            className={`bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 rounded transition ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
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
