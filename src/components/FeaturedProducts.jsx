import React, { useState } from 'react';
import toast from 'react-hot-toast';

// Import images
import BlackScrubImg from '/assets/Black_Scrub.jpeg';
import PinkScrubImg from '/assets/Pink_Scrub.jpeg';
import BlueScrubImg from '/assets/General_Blue_Scrub.png';

export default function FeaturedProducts({
  selectedColor = 'All',
  selectedTag = 'All',
  searchQuery = '',
  sortOrder = 'default',
  setCartItems
}) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = [
    {
      id: 1,
      name: 'Signature Black Scrub',
      price: 299,
      numericPrice: 299,
      color: 'Black',
      tags: ['Men', 'Unisex'],
      image: BlackScrubImg,
    },
    {
      id: 2,
      name: 'Premium Pink Scrub',
      price: 349,
      numericPrice: 349,
      color: 'Pink',
      tags: ['Women'],
      image: PinkScrubImg,
    },
    {
      id: 3,
      name: 'Elegant Blue Scrub',
      price: 329,
      numericPrice: 329,
      color: 'Blue',
      tags: ['Unisex'],
      image: BlueScrubImg,
    }
  ];

  const filtered = products
    .filter((product) => {
      const matchesColor = selectedColor === 'All' || product.color === selectedColor;
      const matchesTag = selectedTag === 'All' || product.tags.includes(selectedTag);
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesColor && matchesTag && matchesSearch;
    })
    .sort((a, b) => {
      if (sortOrder === 'lowToHigh') {
        return a.numericPrice - b.numericPrice;
      } else if (sortOrder === 'highToLow') {
        return b.numericPrice - a.numericPrice;
      } else {
        return a.name.localeCompare(b.name);
      }
    });

  const addToCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      return exists
        ? prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prev, { ...product, quantity: 1 }];
    });

    toast.success(`${product.name} added to cart!`);
    setSelectedProduct(null); // Close modal after adding to cart
  };

  return (
    <section className="py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {filtered.map(product => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow p-6 hover:shadow-xl transition cursor-pointer"
            onClick={() => setSelectedProduct(product)}
          >
            <img src={product.image} alt={product.name} className="w-48 h-48 object-cover mb-4 rounded" />
            <h3 className="text-lg font-semibold text-gray-700">{product.name}</h3>
            <p className="text-gold font-bold text-lg mb-2">R{product.price}</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
              className="bg-gold text-black px-6 py-2 rounded-full hover:bg-black hover:text-gold transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-white rounded-lg p-6 max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
            >
              &times;
            </button>
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-64 object-cover rounded mb-4"
            />
            <h2 className="text-xl font-bold mb-2">{selectedProduct.name}</h2>
            <p className="text-gray-700 mb-4">
              {selectedProduct.description || 'High-quality scrub with elegant design and comfort.'}
            </p>
            <p className="text-gold font-semibold text-lg mb-4">R{selectedProduct.price}</p>
            <button
              onClick={() => addToCart(selectedProduct)}
              className="bg-black text-gold px-4 py-2 rounded-full hover:bg-gold hover:text-black border border-gold transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </section>
  );
}