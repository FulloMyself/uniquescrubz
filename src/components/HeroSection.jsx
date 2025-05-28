import React from 'react';
import { Link } from 'react-router-dom';


export default function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-white-100 via-gold-100 to-white py-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
        {/* Text Section */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold text-black leading-tight mb-6">
            Be Bold. Be Unique. <br /> Scrub Up in Style!
          </h1>
          <p className="text-gray-700 text-lg mb-6">
            Discover premium quality scrubs made for comfort and style. Perfect for professionals who care.
          </p>
          <Link
            to="/shop"
            className="inline-block bg-gold text-black px-6 py-3 rounded-full text-lg font-semibold hover:bg-black hover:text-gold transition"
          >
          Shop Now
          </Link>

        </div>

        {/* Image Section */}
        <div className="flex-1">
          <img
            src="/assets/banner.png"
            alt="Scrubz"
            className="rounded-3xl shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}
