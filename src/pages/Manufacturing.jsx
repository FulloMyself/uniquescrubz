import React, { useState } from "react";
import { motion } from 'framer-motion';
import Footer from "../components/Footer";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const images = [
  "/images/manufacturing/poster.jpg",
  "/images/manufacturing/chef_coat.jpg",
  "/images/manufacturing/patterned_coat.jpg",
  "/images/manufacturing/coat_patterned.jpg",
  "/images/manufacturing/black_bright_top.jpg",
  "/images/manufacturing/couple_outfit.jpg",
  "/images/manufacturing/poodle_in_dress.mp4",
  "/images/manufacturing/poodle_dress.jpg",
  "/images/manufacturing/poodle_suit.jpg",
  "/images/manufacturing/white_one_piece.jpg",
  "/images/manufacturing/man_two_piece.jpg",
  "/images/manufacturing/patterned_dresses.jpg",
];

export default function Manufacturing() {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.5 }}
      >
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

        {/* Gallery */}
        <div className="mt-16 max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">Our Previous Work</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {images.map((img, index) => (
              <div
                key={index}
                className="cursor-pointer overflow-hidden rounded shadow-lg"
                onClick={() => {
                  setPhotoIndex(index);
                  setIsOpen(true);
                }}
              >
                <img
                  src={img}
                  alt={`Work ${index + 1}`}
                  className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
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
