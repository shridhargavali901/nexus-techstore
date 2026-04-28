import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const premiumGadgets = [
  {
    name: "Nova X9 Smartwatch",
    description: "Titanium body, sapphire glass, and AI-driven health tracking.",
    price: 499,
    category: "Wearables",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=800",
    isPremium: true
  },
  {
    name: "Aura Noise-Cancelling Headphones",
    description: "Studio-quality sound with 40-hour battery life and spatial audio.",
    price: 349,
    category: "Audio",
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=800",
    isPremium: true
  },
  {
    name: "Phantom Mechanical Keyboard",
    description: "Custom tactile switches, RGB underglow, and aircraft-grade aluminum.",
    price: 199,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=800",
    isPremium: true
  },
  {
    name: "Nebula 4K Drone",
    description: "Cinematic 4K 60fps recording, 3-axis gimbal, and 10km range.",
    price: 899,
    category: "Drones",
    image: "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?auto=format&fit=crop&q=80&w=800",
    isPremium: true
  }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB Connected for Seeding 🌱');
    await Product.deleteMany(); 
    await Product.insertMany(premiumGadgets);
    console.log('Premium Gadgets Injected Successfully! 📦🚀');
    process.exit();
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });
