import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import FeaturedProducts from '../components/FeaturedProducts';
import Footer from '../components/Footer';

export default function Contact({ cartItems, setCartItems }) {
  return (
    <>
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">Featured Products</h1>
      <FeaturedProducts cartItems={cartItems} setCartItems={setCartItems} />
      
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Contact Us</h1>
      <p className="text-center text-gray-600 max-w-xl mx-auto">
        Have questions or feedback? We'd love to hear from you. Reach out via email or follow us on social media.
      </p>
      <Footer />
    </motion.div>
    </>
  );
}
