import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';

export default function Cart({ cartItems, setCartItems, isCartOpen, setIsCartOpen }) {
  const [showCheckout, setShowCheckout] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0
  );

  const increaseQty = (id) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handlePlaceOrder = async () => {
    const orderDetails = {
      name: customerName,
      email: customerEmail,
      items: cartItems.map(item => `${item.name} x ${item.quantity}`).join(', '),
      total: `R${totalPrice.toFixed(2)}`
    };

    try {
      await emailjs.send(
        'service_UniqueScrubz-Ord',
        'template_05839d5',
        orderDetails,
        'LBscrLEGz7DznaDAm'
      );

      alert('Order submitted! Thank you.');
      setIsCartOpen(false);
      setShowCheckout(false);
      setCustomerName('');
      setCustomerEmail('');
      setCartItems([]);
    } catch (error) {
      alert('Failed to send order. Please try again.');
      console.error('EmailJS Error:', error);
    }
  };

  const handlePayfastRedirect = () => {
    if (!customerName || !customerEmail) {
      alert('Please enter your name and email before proceeding.');
      return;
    }

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://www.payfast.co.za/eng/process';

    const data = {
      merchant_id: '11469840',
      merchant_key: 'sayrtqqspywws',
      amount: totalPrice.toFixed(2),
      item_name: 'Unique Scrubz Order',
      name_first: customerName,
      email_address: customerEmail,
      return_url: 'https://uniquescrubz.co.za/thank-you',
      cancel_url: 'https://uniquescrubz.co.za/',
      notify_url: 'https://your-server.com/api/payfast-webhook'
    };

    for (const key in data) {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = data[key];
      form.appendChild(input);
    }

    document.body.appendChild(form);
    form.submit();
  };

  return (
    <>
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              key="backdrop"
              className="fixed inset-0 bg-black bg-opacity-40 z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsCartOpen(false)}
            />
            <motion.div
              key="sidebar"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-40"
            >
              <div className="p-6 h-full overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Your Cart</h2>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="text-gold font-bold hover:text-pink-800 transition"
                  >
                    ✕
                  </button>
                </div>

                {cartItems.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-lg font-semibold text-gray-600">🛒 Your cart is empty</p>
                    <p className="text-sm text-gray-400 mt-1">Add items to get started!</p>
                  </div>
                ) : (
                  <>
                    {cartItems.map(item => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        className="border-b py-4 flex justify-between items-center"
                      >
                        <div>
                          <h4 className="font-semibold">{item.name}</h4>
                          <p>R{item.price}</p>
                          <div className="flex items-center mt-2 gap-2">
                            <button
                              onClick={() => decreaseQty(item.id)}
                              className="px-2 bg-red-500 text-black rounded"
                            >-</button>
                            <span>{item.quantity}</span>
                            <button
                              onClick={() => increaseQty(item.id)}
                              className="px-2 bg-green-500 text-black rounded"
                            >+</button>
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="bg-red-500 hover:bg-red-600 text-black px-3 py-1 rounded-full transition-all duration-200"
                        >
                          ×
                        </button>
                      </motion.div>
                    ))}
                    <div className="mt-6 text-lg font-bold">Total: R{totalPrice.toFixed(2)}</div>
                    <button
                      onClick={() => setShowCheckout(true)}
                      className="mt-4 w-full bg-black text-gold py-2 rounded hover:bg-gold hover:text-black border border-gold transition"
                    >
                      Checkout
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCheckout && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg overflow-y-auto max-h-[90vh]"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h2 className="text-2xl font-bold mb-4">Confirm Your Order</h2>

              <div className="space-y-3">
                {cartItems.map(item => (
                  <div key={item.id} className="border-b pb-2">
                    <p>{item.name} x {item.quantity}</p>
                    <p className="text-sm text-gray-600">R{item.price}</p>
                  </div>
                ))}
              </div>

              <div className="my-4">
                <label className="block mb-1 font-semibold">Your Name</label>
                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-semibold">Your Email</label>
                <input
                  type="email"
                  className="w-full border px-3 py-2 rounded"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <p className="font-bold mb-2">Payment Options:</p>

                <button
                  onClick={() => alert('Redirecting to Ozow (Capitec Pay)...')}
                  className="w-full bg-blue-600 text-black py-2 px-4 rounded hover:bg-blue-700 transition"
                >
                  💳 Pay with Capitec Pay (Ozow)
                </button>

                <button
                  onClick={handlePayfastRedirect}
                  className="w-full bg-green-600 text-black py-2 px-4 mt-2 rounded hover:bg-green-700 transition"
                >
                  Pay with Payfast 💳
                </button>

                <div className="bg-gray-100 p-4 rounded text-sm text-gray-800 mt-3">
                  <p className="font-semibold mb-1">🏦 Direct EFT Details:</p>
                  <p>Account Name: Unique Scrubz</p>
                  <p>Bank: FNB</p>
                  <p>Account Number: 1234567890</p>
                  <p>Reference: Your Name</p>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowCheckout(false)}
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePlaceOrder}
                  className="px-4 py-2 rounded bg-black text-gold hover:bg-gold hover:text-black border border-gold transition"
                  disabled={!customerName || !customerEmail}
                >
                  Confirm Order
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
