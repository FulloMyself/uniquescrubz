// src/pages/Manufacturing.jsx
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/Footer";

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
  const [videoIndex, setVideoIndex] = useState(0);
  const videos = [
    `${base}/images/manufacturing/uniquescrubs.mp4`,
    `${base}/images/manufacturing/poodle_in_dress.mp4`,
  ];

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
    <div>
      {/* Booking Form */}
      <div className="pt-28 px-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Book a Manufacturing Appointment</h1>
        <p className="mb-4">Please fill out the form below to schedule a consultation about your manufacturing needs.</p>
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
  {isSubmitting ? "Booking..." : "Book Appointment"}
</button>

        </form>
      </div>

      <hr className="my-10 border-gray-300" />

      {/* Gallery Grid */}
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Our Previous Work</h2>
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

      {/* Video Preview */}
      <div className="mt-16 flex flex-col items-center">
      <video
        key={videoIndex}
        controls
        width="640"
        height="360"
        style={{ borderRadius: "1rem", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
      >
        <source src={videos[videoIndex]} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="mt-4 flex gap-4">
        <button
          onClick={() => setVideoIndex(0)}
          className={`px-4 py-2 rounded ${videoIndex === 0 ? "bg-gold text-black" : "bg-gray-200"}`}
        >
          Video 1
        </button>
        <button
          onClick={() => setVideoIndex(1)}
          className={`px-4 py-2 rounded ${videoIndex === 1 ? "bg-gold text-black" : "bg-gray-200"}`}
        >
          Video 2
        </button>
      </div>
    </div>

      <Footer />
    </div>
  );
}
