import React, { useState } from 'react';
import { ShoppingCart, Search, User, LogOut, LayoutDashboard } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import useCartStore from '../store/useCartStore';
import useAuthStore from '../store/useAuthStore';
import CartDrawer from './CartDrawer';

const Navbar = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const { user, logout } = useAuthStore();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-400">
            NEXUS.
          </Link>
          
          <div className="flex items-center gap-6">
            {/* Admin Dashboard Link - Visible ONLY to Admin */}
            {user?.isAdmin && (
              <Link to="/admin" className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors bg-indigo-500/10 px-4 py-2 rounded-full border border-indigo-500/20">
                <LayoutDashboard size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest">Dashboard</span>
              </Link>
            )}

            <div className="flex items-center gap-4 border-l border-white/10 pl-6 h-8">
              {user ? (
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-white uppercase tracking-tight">{user.name}</span>
                  <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-red-500 transition-all cursor-pointer">
                    <LogOut size={18} />
                  </button>
                </div>
              ) : (
                <Link to="/auth" className="p-2 text-gray-400 hover:text-white transition-colors">
                  <User size={20} />
                </Link>
              )}
            </div>

            <button onClick={() => setIsCartOpen(true)} className="relative p-2 text-gray-400 hover:text-white cursor-pointer">
              <ShoppingCart size={22} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[9px] font-black h-4 w-4 rounded-full flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;
