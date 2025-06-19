import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import bannerImg from '/assets/unique_scrubs_hero.png';

export default function HeroSection() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleShopClick = (e) => {
    if (location.pathname === "/shop") {
      e.preventDefault();
      const productSection = document.getElementById("product-section");
      if (productSection) {
        productSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/shop");
    }
  };

  return (
    <section className="bg-gradient-to-b from-white-100 via-gold-100 to-white py-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
        {/* Text Section */}
        <div className="flex-[0.8] text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold text-black leading-tight mb-6">
            Be Bold. Be Unique. <br /> Scrub Up in Style!
          </h1>
          <p className="text-gray-700 text-lg mb-6">
            Discover premium quality scrubs made for comfort and style. Perfect for professionals who care.
          </p>
          <button
            type="button"
            onClick={handleShopClick}
            className="inline-block bg-gold text-black px-6 py-3 rounded-full text-lg font-semibold hover:bg-black hover:text-gold transition"
          >
            Shop Now
          </button>
        </div>

        {/* Image Section */}
        <div className="flex-[1.2] flex justify-center items-center">
          <img
            src={bannerImg}
            alt="Scrubz"
            className="rounded-3xl shadow-2xl"
            style={{
              width: "100%",
              height: "450px",
              maxWidth: "600px",
              objectFit: "contain",
              background: "#caa92a"
            }}
          />
        </div>
      </div>
    </section>
  );
}