import React from 'react';
import toast from 'react-hot-toast';

// Import all images
import BlackFullScrubImg from '/assets/BlackFull_Scrub.jpeg';
import BlackPatternedScrubsImg from '/assets/BlackPatterned_Scrubs.jpeg';
import BlueScrubImg from '/assets/Blue_Scrub.jpeg';
import BlueFullScrubsImg from '/assets/BlueFull_Scrubs.png';
import BluePatternedScrubImg from '/assets/BluePatterned_Scrub.jpeg';
import CharcoalScrubImg from '/assets/Charcoal_Scrub.jpeg';
import CreamScrubImg from '/assets/Cream_Scrub.jpeg';
import GenderNeutralBlackFullScrubImg from '/assets/GenderNeutralBlackFull_Scrub.png';
import GenderNeutralBlueFullScrubImg from '/assets/GenderNeutralBlueFull_Scrub.png';
import GentsColourfulScrubsImg from '/assets/GentsColourful_Scrubs.jpeg';
import GrayFullScrubsImg from '/assets/GrayFull_Scrubs.jpeg';

export default function ProductSection({
  setCartItems,
  selectedColor = 'All',
  selectedTag = 'All',
  selectedType = 'All',
  searchQuery = '',
  sortOrder = 'default',
  currentPage = 1,
  setCurrentPage,
}) {
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [selectedSizes, setSelectedSizes] = React.useState({});
  const [selectedProductType, setSelectedProductType] = React.useState('All');

  const products = [
    {
      id: 1,
      name: 'Signature Black Scrub Set',
      price: 799,
      numericPrice: 799,
      color: ['Black', 'Mix'],
      tags: ['Unisex'],
      image: BlackFullScrubImg,
      description: 'A sleek and professional black scrub designed for comfort and performance.',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      type: 'Set',
    },
    {
      id: 2,
      name: 'Patterned Black Scrub Set',
      price: 799,
      numericPrice: 799,
      color: ['Black', 'Patterned'],
      tags: ['Men'],
      image: BlackPatternedScrubsImg,
      description: 'A sleek and professional black, patterned scrub designed for comfort and performance.',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      type: 'Set',
    },
    {
      id: 3,
      name: 'Elegant Blue Scrub Set',
      price: 799,
      numericPrice: 799,
      color: 'Blue',
      tags: ['Unisex'],
      image: BlueScrubImg,
      description: 'A sleek and professional blue scrub designed for comfort and performance.',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      type: 'Set',
    },
    {
      id: 4,
      name: 'Everyday Blue Scrub Set',
      price: 549,
      numericPrice: 549,
      color: 'Blue',
      tags: ['Women'],
      image: BlueFullScrubsImg,
      description: 'A sleek and professional navy scrub designed for comfort and performance.',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      type: 'Set',
    },
    {
      id: 5,
      name: 'Blue Tradition Patterned Scrub Top',
      price: 329,
      numericPrice: 329,
      color: ['Blue', 'Patterned'],
      tags: ['Women'],
      image: BluePatternedScrubImg,
      description: 'A sleek and professional blue traditional patterned scrub designed for comfort and performance.',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      type: 'Top',
    },
    {
      id: 6,
      name: 'Gender Neutral Charcoal Gray Scrub Set',
      price: 799,
      numericPrice: 799,
      color: ['Charcoal', 'Gray'],
      tags: ['Unisex'],
      image: CharcoalScrubImg,
      description: 'A sleek and professional gender neutral charcoal colored scrub designed for comfort and performance.',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      type: 'Set',
    },
    {
      id: 7,
      name: 'Cream Scrub Set',
      price: 799,
      numericPrice: 799,
      color: 'Cream',
      tags: ['Unisex'],
      image: CreamScrubImg,
      description: 'A sleek and professional cream scrub designed for comfort and performance.',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      type: 'Set',
    },
    {
      id: 8,
      name: 'Black Gender Neutral Scrub Set',
      price: 799,
      numericPrice: 799,
      color: 'Black',
      tags: ['Unisex'],
      image: GenderNeutralBlackFullScrubImg,
      description: 'A sleek and professional black scrub designed for comfort and performance.',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      type: 'Set',
    },
    {
      id: 9,
      name: 'Blue Gender Neutral Scrub Set',
      price: 549,
      numericPrice: 549,
      color: 'Blue',
      tags: ['Unisex'],
      image: GenderNeutralBlueFullScrubImg,
      description: 'A sleek and professional blue scrub designed for comfort and performance.',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      type: 'Set',
    },
    {
      id: 10,
      name: 'Traditional Coloured Scrub Set',
      price: 549,
      numericPrice: 549,
      color: ['Mix', 'Patterned'],
      tags: ['Men'],
      image: GentsColourfulScrubsImg,
      description: 'A sleek and professional traditional coloured scrub designed for comfort and performance.',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      type: 'Top',
    },
    {
      id: 11,
      name: 'Gray Scrub Set',
      price: 799,
      numericPrice: 799,
      color: ['Gray'],
      tags: ['Unisex'],
      image: GrayFullScrubsImg,
      description: 'A sleek and professional gray scrub designed for comfort and performance.',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      type: 'Set',
    },
  ];

  const filteredProducts = products
    .filter(product => {
      const colorMatch = selectedColor === 'All' || (Array.isArray(product.color)
    ? product.color.includes(selectedColor)
    : product.color === selectedColor);
      const tagMatch = selectedTag === 'All' || product.tags.includes(selectedTag);
      const typeMatch = selectedType === 'All' || product.type === selectedType;
      const searchMatch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return colorMatch && tagMatch && typeMatch && searchMatch;
    })
    .sort((a, b) => {
      if (sortOrder === 'lowToHigh') return a.numericPrice - b.numericPrice;
      if (sortOrder === 'highToLow') return b.numericPrice - a.numericPrice;
      return a.name.localeCompare(b.name);
    });

  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const addToCart = (product) => {
    const selectedSize = selectedSizes[product.id];
    if (!selectedSize) {
      toast.error('Please select a size before adding to cart.');
      return;
    }

    setCartItems(prev => {
      const exists = prev.find(item => item.id === product.id && item.size === selectedSize);
      return exists
        ? prev.map(item =>
            item.id === product.id && item.size === selectedSize
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prev, { ...product, quantity: 1, size: selectedSize }];
    });

    toast.success(`${product.name} (${selectedSize}) added to cart!`);
  };

  return (
    <section className="py-10">
      <div id="product-section" className="...">
      {/* Filter Dropdown */}
      <div className="max-w-6xl mx-auto mb-6 flex justify-end">
        <select
          value={selectedProductType}
          onChange={(e) => {
            setSelectedProductType(e.target.value);
            setCurrentPage(1);
          }}
          className="border border-gray-300 rounded px-4 py-2"
        >
          <option value="All">All Product Types</option>
          <option value="Top">Tops</option>
          <option value="Pants">Pants</option>
          <option value="Set">Scrub Sets</option>
        </select>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {paginatedProducts.map((product) => (
          <div key={product.id} className="product-card" style={{
  background: "#caa92a",
  borderRadius: "0.5rem",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  padding: "1rem"
}}>
  <button onClick={() => setSelectedProduct(product)} className="focus:outline-none">
    <img
      src={product.image}
      alt={product.name}
      style={{
        width: "100%",
        height: "220px",
        objectFit: "contain",
        background: "#caa92a",
        borderRadius: "0.5rem"
      }}
      className="transition-transform duration-300 hover:scale-105"
      draggable="true"
    />
  </button>
  <h3 className="text-lg font-semibold text-gray-700">{product.name}</h3>
  <p className="text-sm text-gray-600 mb-2">{product.description}</p>
  <p className="text-gold font-bold text-lg mb-2">R{product.price}</p>

  {/* Size Dropdown */}
  <select
    value={selectedSizes[product.id] || ''}
    onChange={(e) =>
      setSelectedSizes({ ...selectedSizes, [product.id]: e.target.value })
    }
    className="w-full mb-3 border border-gray-300 rounded px-3 py-2"
  >
    <option value="">Select Size</option>
    {product.sizes.map((size) => (
      <option key={size} value={size}>{size}</option>
    ))}
  </select>

  {/* Add to Cart */}
  <button
    onClick={() => addToCart(product)}
    className="w-full bg-black text-gold px-4 py-2 rounded-full hover:bg-gold hover:text-black transition border border-gold"
  >
    Add to Cart
  </button>
</div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 space-x-2">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-full ${
              currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-100 hover:bg-gold'
            }`}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-full ${
                currentPage === i + 1 ? 'bg-black text-gold' : 'bg-gray-200 text-gray-800 hover:bg-gold'
              } transition`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-full ${
              currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-100 hover:bg-gold text-black'
            }`}
          >
            Next
          </button>
        </div>
      )}

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
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              &times;
            </button>
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-64 object-cover rounded mb-4"
            />
            <h2 className="text-xl font-bold mb-2">{selectedProduct.name}</h2>
            <p className="text-gray-700 mb-4">{selectedProduct.description}</p>
            <p className="text-gold font-semibold text-lg mb-4">R{selectedProduct.price}</p>
            <button
              onClick={() => {
                addToCart(selectedProduct);
                setSelectedProduct(null);
              }}
              className="bg-black text-gold px-4 py-2 rounded-full hover:bg-gold hover:text-black border border-gold transition w-full"
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
      </div>
    </section>
  );
}