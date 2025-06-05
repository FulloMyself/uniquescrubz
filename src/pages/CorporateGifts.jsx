// CorporateGifts.jsx
import React from "react";

export default function CorporateGifts() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Corporate Gifts</h1>
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
  );
}
