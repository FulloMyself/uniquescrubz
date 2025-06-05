// src/components/Footer.jsx
import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import logo from '/assets/logo.jpeg'; // update path if different

export default function Footer() {
  return (
    <footer className="bg-gold text-black py-10 mt-12">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start">
                  <img src={logo} alt="Logo" className="h-12 mb-2 tracking-wide"/>
          <p className="text-sm">&copy; {new Date().getFullYear()} Unique Scrubz and Clothing. All rights reserved.</p>
        </div>

        <div className="text-center md:text-left">
          <h4 className="font-bold mb-2">Contact Info</h4>
          <p>Email: info@uniquescrubz.co.za</p>
          <p>Phone: +27 61 234 5678</p>
        </div>

        <div className="flex space-x-4">
          <a href="https://web.facebook.com/UniqueScrubsZA" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="hover:text-pink-500 transition text-xl" />
          </a>
          <a href="https://instagram.com/unique_scrubs_za" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="hover:text-pink-500 transition text-xl" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="hover:text-pink-500 transition text-xl" />
          </a>
        </div>
      </div>
    </footer>
  );
}
