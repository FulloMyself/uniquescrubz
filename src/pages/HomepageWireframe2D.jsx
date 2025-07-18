// src/pages/HomepageWireframe2D.jsx
import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer"; // ✅ Import Footer

export default function HomepageWireframe2D() {
  const blocks = [
    { name: "Shop Now", route: "/shop", color: "bg-sky-400" },
    { name: "About Us", route: "/about", color: "bg-green-400" },
    { name: "Gifts", route: "/corporate-gifts", color: "bg-pink-400" },
    { name: "Gallery", route: "/manufacturing", color: "bg-yellow-400" },
    { name: "Events", route: "/events", color: "bg-purple-400" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100">
      {/* ✅ Main content (centered buttons) */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-md w-full">
          {blocks.map((block, idx) => (
            <Link
              key={idx}
              to={block.route}
              className={`
                ${block.color} rounded-xl p-6 text-center text-lg font-bold shadow-md
                hover:scale-110 hover:shadow-lg active:scale-95 transition transform
                text-white
              `}
              style={{
                minHeight: "100px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {block.name}
            </Link>
          ))}
        </div>
      </div>

      {/* ✅ Footer (branding at bottom) */}
      <Footer />
    </div>
  );
}
