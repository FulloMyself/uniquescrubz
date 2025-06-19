// src/pages/Manufacturing.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import "react-image-lightbox/style.css";

const base = import.meta.env.BASE_URL;

const images = [
  `${base}images/manufacturing/poster.jpg`,
  `${base}images/manufacturing/chef_coat.jpg`,
  `${base}images/manufacturing/patterned_coat.jpg`,
  `${base}images/manufacturing/coat_patterned.jpg`,
  `${base}images/manufacturing/black_bright_top.jpg`,
  `${base}images/manufacturing/couple_outfit.jpg`,
  `${base}images/manufacturing/poodle_dress.jpg`,
  `${base}images/manufacturing/poodle_suit.jpg`,
  `${base}images/manufacturing/white_one_piece.jpg`,
  `${base}images/manufacturing/man_two_piece.jpg`,
  `${base}images/manufacturing/patterned_dresses.jpg`,
  `${base}images/manufacturing/kitchen_dress.jpg`,
  `${base}images/manufacturing/Scrubs.jpg`,
  `${base}images/manufacturing/Purple_Scrubs.jpg`,
];

export default function Manufacturing() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
     e.preventDefault();
     setIsSubmitting(true);

    try {
      const res = await fetch("https://email-server-5l9g.onrender.com/send-manufacturing-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (res.ok) {
        alert("Appointment booked. Confirmation sent.");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        alert("Failed to send. Try again later.");
        console.error("Error:", result);
      }
    } catch (err) {
      console.error("Failed to send booking emails", err);
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
      {/* Booking Form */}
      <div className="pt-28 px-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Book a Manufacturing Appointment</h1>
        <p className="mb-4">Please fill out the form below to schedule a consultation about your manufacturing needs.</p>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input name="name" required placeholder="Full Name" value={formData.name} onChange={handleChange} className="border p-2 rounded" />
          <input name="email" required type="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="border p-2 rounded" />
          <input name="phone" required placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="border p-2 rounded" />
          <textarea name="message" required rows={5} placeholder="Describe your manufacturing needs" value={formData.message} onChange={handleChange} className="border p-2 rounded" />
          <button
  type="submit"
  className={`bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 rounded transition ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
  disabled={isSubmitting}
>
  {isSubmitting ? "Booking..." : "Book Appointment"}
</button>

        </form>
      </div>

      <hr className="my-10 border-gray-300" />

      {/* Gallery Grid */}
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Our Previous Work</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((img, index) => (
            <div
  key={index}
  className="overflow-hidden rounded shadow-lg group hover:shadow-2xl transition"
  style={{ pointerEvents: "auto" }}
>
  <img
    src={img}
    alt={`Work ${index + 1}`}
    className="w-full h-56 object-contain bg-white transition-transform duration-300 group-hover:scale-105"
    style={{ objectPosition: "center" }}
    draggable="true"
    onClick={(e) => e.preventDefault()}
  />
</div>
          ))}
        </div>
      </div>


      {/* Video Preview */}
      <div className="mt-16 px-6 max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold mb-3 text-center">Video Preview</h2>
        <video
          src={`${base}images/manufacturing/poodle_in_dress.mp4`}
          controls
          className="w-full rounded shadow-lg"
        />
      </div>

      <Footer />
    </motion.div>
  );
}
