import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import HeroSection from "../components/HeroSection";
import FeaturedProducts from "../components/FeaturedProducts";
import ProductSection from "../components/ProductSection";
import Footer from "../components/Footer";
import HomepageWireframe from "./HomepageWireframe";

export default function Home({ cartItems, setCartItems }) {
  const [selectedColor, setSelectedColor] = useState("All");
  const [selectedTag, setSelectedTag] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);

  const [showWireframe, setShowWireframe] = useState(true);

  const navigate = useNavigate();

  // Handle clicks on department blocks in the wireframe
  const handleDepartmentClick = (department) => {
    switch (department) {
      case "scrubs":
        navigate("/shop");
        break;
      case "manufacturing":
        navigate("/manufacturing");
        break;
      case "corporate-gifts":
        navigate("/corporate-gifts");
        break;
      case "about-us":
        navigate("/about");
        break;
      case "home-decor":
        navigate("/home-decor");
        break;
      case "events":
        navigate("/events");
        break;
      default:
        break;
    }
  };

  return showWireframe ? (
    <HomepageWireframe
      onEnterMall={() => setShowWireframe(false)}
      onDepartmentClick={handleDepartmentClick} // pass click handler
    />
  ) : (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection cartItems={cartItems} setCartItems={setCartItems} />

      <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
        Featured Products
      </h1>
      <FeaturedProducts cartItems={cartItems} setCartItems={setCartItems} />

      <h1 className="text-4xl font-bold text-center text-gray-800 mb-4 mt-12">
        All Products
      </h1>

      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="border border-gray-300 rounded px-4 py-2 w-full md:w-64 focus:outline-none hover:border-pink-500 focus:border-pink-600 transition"
        />

        <select
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2"
        >
          <option value="All">All Colors</option>
          <option value="Black">Black</option>
          <option value="Pink">Pink</option>
          <option value="Blue">Blue</option>
          <option value="White">White</option>

        </select>

        <select
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2"
        >
          <option value="All">All Categories</option>
          <option value="Women">Women</option>
          <option value="Men">Men</option>
          <option value="Unisex">Unisex</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2"
        >
          <option value="default">Sort: Default</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
      </div>

      <ProductSection
        setCartItems={setCartItems}
        selectedColor={selectedColor}
        selectedTag={selectedTag}
        searchQuery={searchQuery}
        sortOrder={sortOrder}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <Footer />
    </motion.div>
  );
}
