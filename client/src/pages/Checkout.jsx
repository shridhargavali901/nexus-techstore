import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useCartStore from '../store/useCartStore';
import useAuthStore from '../store/useAuthStore';
import { CreditCard, CheckCircle } from 'lucide-react';

const Checkout = () => {
  const { cartItems, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + (Number(item.price) || 0), 0);
  };

  const handlePayment = async () => {
    if (!user) return navigate('/auth');
    
    try {
      const orderData = {
        userId: user._id,
        orderItems: cartItems.map(item => ({
          name: item.name,
          price: item.price,
          image: item.image,
          product: item._id
        })),
        totalPrice: calculateTotal(),
      };

      await axios.post(`${API_BASE_URL}/api/orders`, orderData);
      
      setIsSuccess(true);
      setTimeout(() => {
        clearCart();
        navigate('/'); // FIX: Ab user seedha Home page jayega
      }, 2500);
      
    } catch (err) {
      alert("Order failed");
    }
  };

  if (isSuccess) return (
    <div className="h-[80vh] flex flex-col items-center justify-center space-y-6 text-center">
      <div className="p-6 bg-green-500/20 rounded-full text-green-500 animate-bounce">
        <CheckCircle size={80} />
      </div>
      <h1 className="text-5xl font-black uppercase tracking-tighter italic text-white">Order Secured.</h1>
      <p className="text-gray-500 text-sm tracking-widest uppercase font-bold">Redirecting to Nexus Home...</p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-10">Checkout.</h1>
      <div className="bg-[#0a0a0a] p-10 rounded-3xl border border-white/5 space-y-8">
        <div className="flex justify-between items-baseline border-b border-white/10 pb-6">
          <span className="text-indigo-400 font-black uppercase text-xs tracking-widest">Grand Total</span>
          <span className="text-5xl font-black text-white">${calculateTotal()}</span>
        </div>
        <button 
          onClick={handlePayment} 
          className="w-full py-5 bg-white text-black font-black uppercase tracking-widest rounded-xl hover:bg-indigo-600 hover:text-white transition-all cursor-pointer"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Checkout;
