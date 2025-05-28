import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar';
import Cart from './components/Cart';
import Home from './pages/Home';
import Shop from './pages/Shop';
import About from './pages/About';
import Contact from './pages/Contact';

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };

  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar
        cartItems={cartItems}
        setIsCartOpen={setIsCartOpen}
        isCartOpen={isCartOpen}
        toggleCart={toggleCart}
      />
      <Cart
        cartItems={cartItems}
        setCartItems={setCartItems}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
      />
      <AnimatedRoutes
        cartItems={cartItems}
        setCartItems={setCartItems}
      />
    </Router>
  );
}

function AnimatedRoutes({ cartItems, setCartItems }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={<Home cartItems={cartItems} setCartItems={setCartItems} />}
        />
        <Route
          path="/shop"
          element={<Shop cartItems={cartItems} setCartItems={setCartItems} />}
        />
        <Route
        path="/about"
        element={<About cartItems={cartItems} setCartItems={setCartItems} />}
        />
        <Route
        path="/contact"
        element={<Contact cartItems={cartItems} setCartItems={setCartItems}/>}
        />
      </Routes>
    </AnimatePresence>
  );
}