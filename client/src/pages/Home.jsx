import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingCart, Check, ExternalLink, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import useCartStore from '../store/useCartStore';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [addedItems, setAddedItems] = useState({});
  const addToCart = useCartStore((state) => state.addToCart);

  // Dynamic API URL
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/api/products`);
        if (Array.isArray(data)) {
          setProducts(data);
          setFilteredProducts(data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [API_BASE_URL]);

  useEffect(() => {
    let result = Array.isArray(products) ? products : [];
    if (activeCategory !== 'All') result = result.filter(p => p.category === activeCategory);
    if (searchTerm) result = result.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredProducts(result);
  }, [searchTerm, activeCategory, products]);

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAddedItems(prev => ({ ...prev, [product._id]: true }));
    setTimeout(() => setAddedItems(prev => ({ ...prev, [product._id]: false })), 2000);
  };

  const categories = ['All', 'Audio', 'Wearables', 'Accessories', 'Drones'];

  return (
    <div className="flex flex-col items-center min-h-screen p-8 pb-20">
      <div className="max-w-3xl text-center space-y-6 mt-10 mb-20">
        <h1 className="text-6xl md:text-8xl font-black tracking-tight text-white drop-shadow-lg">
          Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-400">Tech.</span>
        </h1>
        <p className="text-xl text-gray-400 font-light tracking-wide max-w-2xl mx-auto italic uppercase tracking-[0.2em]">Nexus Elite Collection</p>
      </div>

      <div className="w-full max-w-7xl mb-12 flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="relative w-full md:max-w-md group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400" size={18} />
          <input 
            type="text" 
            placeholder="Search collection..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500/50 transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase border transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === cat ? 'bg-white text-black border-white' : 'bg-transparent text-gray-500 border-white/10 hover:text-white hover:border-white/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full max-w-7xl">
        {loading ? (
          <div className="text-center text-indigo-500 font-bold animate-pulse tracking-widest">INITIALIZING SYSTEM...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.isArray(filteredProducts) && filteredProducts.map((product) => (
              <Link to={`/product/${product._id}`} key={product._id} className="group relative bg-[#0a0a0a] rounded-2xl overflow-hidden border border-white/5 hover:border-indigo-500/30 transition-all duration-500 shadow-lg hover:shadow-[0_0_30px_rgba(79,70,229,0.1)] block">
                <div className="aspect-square bg-[#111] overflow-hidden relative">
                  <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-80 group-hover:opacity-100" />
                  <div className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"><ExternalLink size={14} /></div>
                </div>
                <div className="p-6 space-y-3">
                  <div className="text-[10px] font-bold tracking-widest text-indigo-400 uppercase">{product.category}</div>
                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors leading-tight">{product.name}</h3>
                  <div className="flex items-center justify-between pt-4">
                    <span className="text-2xl font-black text-white">${product.price}</span>
                    <button onClick={(e) => handleAddToCart(e, product)} className={`p-3 rounded-full text-white transition-all cursor-pointer ${addedItems[product._id] ? 'bg-green-500' : 'bg-white/5 hover:bg-indigo-600'}`}>
                      {addedItems[product._id] ? <Check size={18} /> : <ShoppingCart size={18} />}
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
