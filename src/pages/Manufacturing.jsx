// src/pages/Manufacturing.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import Lightbox from "react-image-lightbox";
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
          <p className="mb-4">
            Please fill out the form below to schedule a consultation about your manufacturing needs.
          </p>
          <form className="flex flex-col gap-4">
            <input type="text" placeholder="Full Name" required className="border p-2 rounded" />
            <input type="email" placeholder="Email Address" required className="border p-2 rounded" />
            <input type="tel" placeholder="Phone Number" required className="border p-2 rounded" />
            <textarea placeholder="Describe your manufacturing needs" rows={5} required className="border p-2 rounded" />
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 rounded"
            >
              Book Appointment
            </button>
          </form>
        </div>

        <hr className="my-10 border-gray-300" />

        {/* Gallery */}
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">Our Previous Work</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {images.map((img, index) => (
              <div
                key={index}
                className="relative cursor-pointer overflow-hidden rounded shadow-lg"
                onClick={() => {
                  setLoadingImage(img);
                  setPhotoIndex(index);
                  setIsOpen(true);
                }}
              >
                {loadingImage === img && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-gold border-opacity-70" />
                  </div>
                )}
                <img
                  src={img}
                  alt={`Work ${index + 1}`}
                  onLoad={() => setLoadingImage(null)}
                  className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
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

        {/* Lightbox */}
        {isOpen && (
          <Lightbox
            mainSrc={images[photoIndex]}
            nextSrc={images[(photoIndex + 1) % images.length]}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            onCloseRequest={() => setIsOpen(false)}
            onMovePrevRequest={() =>
              setPhotoIndex((photoIndex + images.length - 1) % images.length)
            }
            onMoveNextRequest={() =>
              setPhotoIndex((photoIndex + 1) % images.length)
            }
          />
        )}

        <Footer />
      </motion.div>
    </>
  );
}
