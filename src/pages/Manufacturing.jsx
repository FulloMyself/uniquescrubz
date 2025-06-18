import React, { useState } from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import { Carousel } from 'react-responsive-carousel';
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
];

export default function Manufacturing() {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [loadingImage, setLoadingImage] = useState(null);
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
        {/* Booking Form */}
        <div className="pt-28 px-6 max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Book a Manufacturing Appointment</h1>
          <p className="mb-4">Please fill out the form below to schedule a consultation about your manufacturing needs.</p>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 rounded"
            >
              Book Appointment
            </button>
          </form>
        </div> 
        <hr className="my-10 border-gray-300" />
      {/* Carousel */}
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Our Previous Work</h2>
        <Carousel
          showArrows
          autoPlay
          infiniteLoop
          dynamicHeight
          interval={5000}
          showThumbs={false}
          showStatus={false}
        >
          {images.map((img, i) => (
            <div key={i}>
              <img src={img} loading="lazy" alt={`Manufactured item ${i + 1}`} className="rounded-md" />
            </div>
          ))}
        </Carousel>
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
    </>
  );
}
