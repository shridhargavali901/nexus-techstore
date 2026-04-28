import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-20 pb-10 mt-auto">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        
        {/* Brand Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-400">
            NEXUS.
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            Defining the future of technology through premium gadgets and elite design.
          </p>
        </div>
        
        {/* Quick Links */}
        <div>
          <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Collection</h4>
          <ul className="space-y-4 text-gray-500 text-sm">
            <li className="hover:text-indigo-400 cursor-pointer transition-colors tracking-wide">Audio</li>
            <li className="hover:text-indigo-400 cursor-pointer transition-colors tracking-wide">Wearables</li>
            <li className="hover:text-indigo-400 cursor-pointer transition-colors tracking-wide">Drones</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Support</h4>
          <ul className="space-y-4 text-gray-500 text-sm">
            <li className="hover:text-indigo-400 cursor-pointer transition-colors">Shipping</li>
            <li className="hover:text-indigo-400 cursor-pointer transition-colors">Warranty</li>
            <li className="hover:text-indigo-400 cursor-pointer transition-colors">Privacy</li>
          </ul>
        </div>

        {/* Socials - Text Based */}
        <div>
          <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Connect</h4>
          <div className="flex flex-col gap-4 text-gray-500 text-sm">
            <span className="hover:text-white cursor-pointer transition-all uppercase tracking-tighter font-bold">Twitter</span>
            <span className="hover:text-white cursor-pointer transition-all uppercase tracking-tighter font-bold">Instagram</span>
            <span className="hover:text-white cursor-pointer transition-all uppercase tracking-tighter font-bold">Github</span>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="text-center border-t border-white/5 pt-8">
        <p className="text-gray-600 text-[10px] uppercase tracking-[0.3em]">
          © 2026 NEXUS ELITE TECH. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
