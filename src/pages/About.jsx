import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import FeaturedProducts from '../components/FeaturedProducts';
import Footer from '../components/Footer';


export default function About({ cartItems, setCartItems }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">Featured Products</h1>
      <FeaturedProducts cartItems={cartItems} setCartItems={setCartItems} />
      
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">About Unique Scrubz</h1>
      <p className="text-center text-gray-600 max-w-2xl mx-auto">
        Unique Scrubz is dedicated to providing comfortable, stylish, and high-quality medical scrubs. Our mission is to make every healthcare worker feel confident and professional in their workwear.
      </p>
      <Footer />
    </motion.div>
  );
}
