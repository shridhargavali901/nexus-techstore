import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuthStore from '../store/useAuthStore';
import { PlusCircle, Package, Trash2, ShoppingBag, User, CreditCard, RefreshCcw, CheckCircle2 } from 'lucide-react';

const Admin = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('inventory');
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({ name: '', price: '', description: '', image: '', category: 'Audio' });

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // SECURITY GUARD
  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate('/');
    }
  }, [user, navigate]);

  const fetchData = async () => {
    if (!user?.isAdmin) return;
    setLoading(true);
    try {
      const resProd = await axios.get(`${API_BASE_URL}/api/products`);
      const resOrders = await axios.get(`${API_BASE_URL}/api/orders`);
      setProducts(resProd.data || []);
      setOrders(resOrders.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // PRODUCT ACTIONS
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/api/products`, product);
      alert("Gadget Deployed!");
      setProduct({ name: '', price: '', description: '', image: '', category: 'Audio' });
      fetchData();
    } catch (err) {
      alert("Deployment Failed");
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Delete this gadget permanently?")) {
      try {
        await axios.delete(`${API_BASE_URL}/api/products/${id}`);
        fetchData();
      } catch (err) {
        alert("Error deleting product");
      }
    }
  };

  // ORDER ACTIONS (Naya Feature)
  const handleClearOrder = async (id) => {
    if (window.confirm("Mark this order as complete and clear it?")) {
      try {
        await axios.delete(`${API_BASE_URL}/api/orders/${id}`);
        fetchData();
      } catch (err) {
        alert("Error clearing order");
      }
    }
  };

  if (!user?.isAdmin) return null;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h1 className="text-5xl font-black text-white italic uppercase tracking-tighter">Nexus Control.</h1>
          <p className="text-gray-500 text-[10px] font-bold tracking-[0.3em] uppercase mt-2">Operations Dashboard</p>
        </div>
        <div className="flex gap-4">
          <button onClick={fetchData} className="p-3 bg-white/5 border border-white/10 rounded-2xl text-gray-400 hover:text-white transition-all cursor-pointer">
            <RefreshCcw size={20} className={loading ? "animate-spin" : ""} />
          </button>
          <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
            <button onClick={() => setActiveTab('inventory')} className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer ${activeTab === 'inventory' ? 'bg-white text-black' : 'text-gray-500'}`}>Inventory</button>
            <button onClick={() => setActiveTab('orders')} className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer ${activeTab === 'orders' ? 'bg-white text-black' : 'text-gray-500'}`}>Orders ({orders.length})</button>
          </div>
        </div>
      </div>

      {activeTab === 'inventory' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* ADD PRODUCT FORM */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold italic uppercase flex items-center gap-2 text-white"><PlusCircle size={20} className="text-indigo-500"/> Forge Gear</h2>
            <form onSubmit={handleAddProduct} className="bg-[#0a0a0a] p-8 rounded-3xl border border-white/5 space-y-4">
              <input type="text" placeholder="Product Name" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-indigo-500 outline-none" value={product.name} onChange={(e) => setProduct({...product, name: e.target.value})} required />
              <input type="number" placeholder="Price" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-indigo-500 outline-none" value={product.price} onChange={(e) => setProduct({...product, price: e.target.value})} required />
              <select className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white outline-none cursor-pointer" value={product.category} onChange={(e) => setProduct({...product, category: e.target.value})}>
                <option value="Audio" className="bg-[#0a0a0a]">Audio</option>
                <option value="Wearables" className="bg-[#0a0a0a]">Wearables</option>
                <option value="Drones" className="bg-[#0a0a0a]">Drones</option>
                <option value="Accessories" className="bg-[#0a0a0a]">Accessories</option>
              </select>
              <input type="text" placeholder="Image URL" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-indigo-500 outline-none" value={product.image} onChange={(e) => setProduct({...product, image: e.target.value})} required />
              <textarea placeholder="Description" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-indigo-500 outline-none resize-none" rows="3" value={product.description} onChange={(e) => setProduct({...product, description: e.target.value})} required></textarea>
              <button type="submit" className="w-full py-4 bg-white text-black font-black rounded-xl hover:bg-indigo-600 hover:text-white transition-all uppercase tracking-widest text-xs cursor-pointer">Deploy to Store</button>
            </form>
          </div>

          {/* PRODUCT LIST */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold italic uppercase flex items-center gap-2 text-white"><ShoppingBag size={20} className="text-indigo-500"/> Live Gear</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {products.map(p => (
                <div key={p._id} className="bg-[#0a0a0a] border border-white/5 p-4 rounded-2xl flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <img src={p.image} className="w-12 h-12 rounded-lg object-cover border border-white/10" />
                    <div><h4 className="text-white text-sm font-bold leading-tight">{p.name}</h4><p className="text-indigo-500 font-black text-xs">${p.price}</p></div>
                  </div>
                  <button onClick={() => handleDeleteProduct(p._id)} className="p-3 text-gray-600 hover:text-red-500 bg-red-500/0 hover:bg-red-500/10 rounded-xl transition-all cursor-pointer"><Trash2 size={18} /></button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* ORDERS TAB (Now with Clear feature) */
        <div className="space-y-6">
          {orders.length === 0 ? (
            <div className="text-center py-20 bg-white/5 border border-dashed border-white/10 rounded-3xl text-gray-500 font-black uppercase italic">No Pending Orders</div>
          ) : (
            orders.map(order => (
              <div key={order._id} className="bg-[#0a0a0a] border border-white/5 p-6 rounded-3xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:border-indigo-500/30 transition-all">
                
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/5 rounded-2xl text-indigo-400"><User size={20} /></div>
                  <div>
                    <p className="text-white font-bold uppercase tracking-wide">{order.user?.name || 'Guest'}</p>
                    <p className="text-gray-500 text-[10px] font-bold">{order.user?.email}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                   {order.orderItems.map((item, i) => (
                     <img key={i} src={item.image} className="w-10 h-10 object-cover rounded-lg border border-white/10" title={item.name} />
                   ))}
                </div>

                <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                  <div className="text-green-500 font-black text-lg italic">${order.totalPrice}</div>
                  <button 
                    onClick={() => handleClearOrder(order._id)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white rounded-xl font-black text-[10px] uppercase tracking-widest transition-all cursor-pointer"
                  >
                    <CheckCircle2 size={16} /> Clear
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Admin;
