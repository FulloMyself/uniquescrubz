import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import logo from '../assets/logo.jpeg'; // update path if different

export default function Navbar({ cartItems, toggleCart }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const toggleMenu = () => setMenuOpen(prev => !prev);

  return (
    <nav className="bg-gold shadow-md w-full fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
                  <img src={logo} alt="Logo" className="h-12 mb-2" tracking-wide/>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex space-x-6 text-black font-medium">
          <Link to="/" className="hover:text-gray-400 text-xl transition">Home</Link>
          <Link to="/shop" className="hover:text-gray-400 text-xl transition">Shop</Link>
          <Link to="/about" className="hover:text-gray-400 text-xl transition">About</Link>
          <Link to="/contact" className="hover:text-gray-400 text-xl transition">Contact</Link>
        </div>

        {/* Cart & Mobile Menu Toggle */}
        <div className="flex items-center space-x-4">
          {/* Cart Button */}
          <motion.button
            onClick={toggleCart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative bg-gold text-black font-bold px-3 py-2 rounded hover:bg-gray-400 transition duration-300 flex items-center justify-center"
          >
            <motion.div
              key={totalItems}
              initial={{ rotate: 0 }}
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 0.4 }}
            >
              <ShoppingCart className="w-5 h-5" />
            </motion.div>

            {totalItems > 0 && (
              <motion.span
                key={`badge-${totalItems}`}
                initial={{ scale: 0 }}
                animate={{ scale: [1.3, 1] }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="absolute -top-2 -right-2 bg-white text-gold rounded-full text-xs w-5 h-5 flex items-center justify-center shadow"
              >
                {totalItems}
              </motion.span>
            )}
          </motion.button>

          {/* Hamburger Icon */}
          <button onClick={toggleMenu} className="md:hidden text-white">
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Links */}
      {menuOpen && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
          exit={{ height: 0 }}
          className="md:hidden bg-pink-600 px-6 py-4 flex flex-col space-y-4 text-white font-medium"
        >
          <Link to="/" onClick={toggleMenu}>Home</Link>
          <Link to="/shop" onClick={toggleMenu}>Shop</Link>
          <Link to="/about" onClick={toggleMenu}>About</Link>
          <Link to="/contact" onClick={toggleMenu}>Contact</Link>
        </motion.div>
      )}
    </nav>
  );
}
