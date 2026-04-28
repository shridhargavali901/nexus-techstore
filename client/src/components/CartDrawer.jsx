import React from 'react';
import { X, ShoppingBag, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import useCartStore from '../store/useCartStore';

const CartDrawer = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart } = useCartStore();
  const total = cartItems.reduce((acc, item) => acc + (Number(item.price) || 0), 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-md bg-[#050505] border-l border-white/10 h-full shadow-2xl flex flex-col transition-transform duration-300">
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#0a0a0a]">
          <h2 className="text-xl font-bold flex items-center gap-2 text-white">
            <ShoppingBag size={22} className="text-indigo-500" /> Your Nexus Cart
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white cursor-pointer"><X size={24} /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#050505]">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-600 space-y-4">
              <ShoppingBag size={60} strokeWidth={1} className="opacity-20" />
              <p className="text-lg font-light tracking-widest uppercase">Cart Empty</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item._id} className="flex gap-5 items-center p-3 rounded-xl bg-white/5 border border-white/5 group hover:border-red-500/20 transition-all">
                <img src={item.image} className="w-16 h-16 object-cover rounded-lg shadow-lg" />
                <div className="flex-1">
                  <h4 className="font-semibold text-white text-sm">{item.name}</h4>
                  <div className="font-black text-indigo-400">${item.price}</div>
                </div>
                {/* REMOVE BUTTON */}
                <button 
                  onClick={() => removeFromCart(item._id)}
                  className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all cursor-pointer"
                  title="Remove Item"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-8 border-t border-white/10 bg-[#0a0a0a]">
            <div className="flex justify-between items-end mb-6">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Total Investment</p>
                <span className="text-4xl font-black text-white"><span className="text-indigo-500">$</span>{total}</span>
              </div>
            </div>
            <Link 
              to="/checkout" 
              onClick={onClose}
              className="block w-full py-5 bg-white text-black text-center hover:bg-indigo-500 hover:text-white rounded-2xl font-black text-lg tracking-widest transition-all cursor-pointer uppercase shadow-lg"
            >
              Secure Checkout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
