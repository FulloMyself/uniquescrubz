// src/components/Footer.jsx
import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import logo from '/assets/logo.jpeg'; // update path if different
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gold text-black py-10 mt-12">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start">
                  <Link to="/" className="flex items-center">
                  <motion.img
                    whileHover={{ scale: 1.1, y: -2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    src={logo}
                    alt="Logo"
                    className="h-12 mb-2 tracking-wide"
                  />
                  </Link>

          <p className="text-sm">&copy; {new Date().getFullYear()} Unique Scrubz and Clothing. All rights reserved.</p>
        </div>

        <div className="text-center md:text-left">
          <h4 className="font-bold mb-2">Contact Info</h4>
          <p>Email: admin@uniqueclothing.co.za</p>
          <p>Phone: +27 79 885 6271</p>
        </div>

        <div className="flex space-x-4">
          <a href="https://web.facebook.com/UniqueScrubsZA" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="hover:text-pink-500 transition text-xl" />
          </a>
          <a href="https://instagram.com/unique_scrubs_za" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="hover:text-pink-500 transition text-xl" />
          </a>
        </div>
      </div>
    </footer>
  );
}
