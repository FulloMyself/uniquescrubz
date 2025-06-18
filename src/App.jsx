import React, { useState } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AnimatedRoutes from './components/AnimatedRoutes';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import 'react-image-lightbox/style.css';

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };

  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      <AppContent
        cartItems={cartItems}
        setCartItems={setCartItems}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        toggleCart={toggleCart}
      />
    </Router>
  );
}

import { useLocation } from 'react-router-dom';

function AppContent({ cartItems, setCartItems, isCartOpen, setIsCartOpen, toggleCart }) {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/' && (
        <Navbar
          cartItems={cartItems}
          setIsCartOpen={setIsCartOpen}
          isCartOpen={isCartOpen}
          toggleCart={toggleCart}
        />
      )}

      {location.pathname !== '/' && (
        <Cart
          cartItems={cartItems}
          setCartItems={setCartItems}
          isCartOpen={isCartOpen}
          setIsCartOpen={setIsCartOpen}
        />
      )}

      <AnimatedRoutes cartItems={cartItems} setCartItems={setCartItems} />
    </>
  );
}
