// HomeDecor.jsx
import React from "react";
import { motion } from 'framer-motion';
import Footer from "../components/Footer";

export default function HomeDecor() {
  return (
    <>
    <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5 }}
        >
    <div className="pt-24 p-8 max-w-3xl mx-auto min-h-[80vh]">
      <h1 className="text-3xl font-bold mb-6">HomeDecor</h1>
      <p className="mb-6">
        We supply high-quality corporate gifts for all occasions: Father's Day, Mother's Day, Valentine's Day, and more.
      </p>

      {/* Replace with your product listing component or static product cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Example product card */}
        <div className="border rounded p-4">
          <h2 className="font-semibold mb-2">Luxury Gift Basket</h2>
          <p>A curated basket perfect for your corporate gifting needs.</p>
        </div>
        <div className="border rounded p-4">
          <h2 className="font-semibold mb-2">Custom Branded Mug</h2>
          <p>Show appreciation with personalized mugs featuring your company logo.</p>
        </div>
        <div className="border rounded p-4">
          <h2 className="font-semibold mb-2">Executive Notebooks</h2>
          <p>High-quality notebooks to impress your clients and employees.</p>
        </div>
      </div>
    </div>
    </motion.div>

    <Footer />
    </>   
  );
}
