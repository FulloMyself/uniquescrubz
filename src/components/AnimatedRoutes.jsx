import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Home from '../pages/Home';
import HomepageWireframe from '../pages/HomepageWireframe';
import Shop from '../pages/Shop';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Manufacturing from '../pages/Manufacturing';
import CorporateGifts from '../pages/CorporateGifts';
import Events from "../pages/Events";
import HomeDecor from '../pages/HomeDecor';

export default function AnimatedRoutes({ cartItems, setCartItems }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomepageWireframe />} />
        <Route path="/mall" element={<Home cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="/shop" element={<Shop cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="/about" element={<About cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="/contact" element={<Contact cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="/manufacturing" element={<Manufacturing />} />
        <Route path="/corporate-gifts" element={<CorporateGifts />} />
        <Route path="/home-decor" element={<HomeDecor />} />
        <Route path="/events" element={<Events />} />
      </Routes>
    </AnimatePresence>
  );
}
