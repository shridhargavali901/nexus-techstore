import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ShoppingCart, ArrowLeft, Shield, Truck, Zap } from 'lucide-react';
import useCartStore from '../store/useCartStore';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const addToCart = useCartStore((state) => state.addToCart);

  // Dynamic API URL
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/api/products`);
        // Checking if data is a valid array before finding
        if (Array.isArray(data)) {
          const found = data.find(p => p._id === id);
          setProduct(found);
        }
      } catch (error) {
        console.error("Error fetching product", error);
      }
    };
    fetchProduct();
  }, [id, API_BASE_URL]);

  if (!product) return (
    <div className="h-screen flex items-center justify-center text-indigo-500 font-bold animate-pulse tracking-widest uppercase">
      Initialising System...
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-white mb-10 transition-colors w-fit uppercase text-[10px] font-bold tracking-widest">
        <ArrowLeft size={16} /> Back to Collection
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Product Image */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <img src={product.image} alt={product.name} className="relative rounded-2xl w-full aspect-square object-cover border border-white/10 shadow-2xl" />
        </div>

        {/* Product Info */}
        <div className="space-y-8">
          <div className="space-y-4">
            <span className="px-4 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold tracking-[0.2em] rounded-full uppercase">
              {product.category}
            </span>
            <h1 className="text-5xl font-black text-white leading-tight uppercase italic tracking-tighter">{product.name}</h1>
            <p className="text-lg text-gray-400 leading-relaxed font-light">{product.description}</p>
          </div>

          <div className="text-5xl font-black text-white italic tracking-tighter">
            <span className="text-indigo-500">$</span>{product.price}
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4">
            <div className="p-4 bg-white/5 rounded-xl border border-white/5 text-center">
              <Truck className="mx-auto mb-2 text-indigo-400" size={20} />
              <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Fast Delivery</p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/5 text-center">
              <Shield className="mx-auto mb-2 text-indigo-400" size={20} />
              <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">2Y Warranty</p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/5 text-center">
              <Zap className="mx-auto mb-2 text-indigo-400" size={20} />
              <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">In Stock</p>
            </div>
          </div>

          <button 
            onClick={() => addToCart(product)}
            className="w-full py-5 bg-white text-black hover:bg-indigo-600 hover:text-white rounded-2xl font-black text-lg tracking-widest transition-all shadow-xl flex items-center justify-center gap-3 cursor-pointer uppercase"
          >
            <ShoppingCart size={20} /> Add to Nexus Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
