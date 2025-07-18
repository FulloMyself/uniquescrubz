// src/components/Footer.jsx
import React from "react";
import { FaFacebook, FaInstagram, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import logo from "/assets/logo.jpeg"; // update path if needed
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gold text-black py-10 mt-12">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center gap-6">
        {/* Logo & Copyright */}
        <div className="flex flex-col items-center">
          <Link to="/" className="flex items-center">
            <motion.img
              whileHover={{ scale: 1.1, y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
              src={logo}
              alt="Logo"
              className="h-12 mb-2 tracking-wide"
            />
          </Link>
          <p className="text-sm text-center">
            &copy; {new Date().getFullYear()} Unique Scrubz and Clothing. All rights reserved.
          </p>
        </div>

        {/* Social + Contact Icons */}
        <div className="flex space-x-6 text-xl items-center">
          {/* Email */}
          <a
            href="mailto:admin@uniqueclothing.co.za"
            className="hover:text-pink-500 transition flex items-center gap-1"
          >
            <FaEnvelope />
          </a>

          {/* Phone */}
          <a
            href="tel:+27798856271"
            className="hover:text-pink-500 transition flex items-center gap-1"
          >
            <FaPhoneAlt />
          </a>

          {/* Facebook */}
          <a
            href="https://web.facebook.com/UniqueScrubsZA"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 transition"
          >
            <FaFacebook />
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com/unique_scrubs_za"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 transition"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
}
