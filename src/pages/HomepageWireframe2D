// src/pages/HomepageWireframe2D.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function HomepageWireframe2D() {
  const blocks = [
    { name: "Shop", route: "/shop", color: "bg-yellow-400" },
    { name: "About", route: "/about", color: "bg-green-400" },
    { name: "Contact", route: "/contact", color: "bg-blue-400" },
    { name: "Manufacturing", route: "/manufacturing", color: "bg-red-400" },
    { name: "Home-Decor", route: "/home-decor", color: "bg-blue-400" },
    { name: "Events", route: "/events", color: "bg-purple-400" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 p-6">
      {blocks.map((block, idx) => (
        <Link
          key={idx}
          to={block.route}
          className={`${block.color} rounded-xl p-6 text-center text-lg font-bold shadow-md hover:scale-105 transition`}
        >
          {block.name}
        </Link>
      ))}
    </div>
  );
}
