import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    // STRICT FIX: Yahan explicitly isAdmin: false bhej rahe hain
    const user = await User.create({ name, email, password, isAdmin: false });
    
    const token = jwt.sign({ id: user._id }, 'NEXUS_SECRET_KEY', { expiresIn: '30d' });
    
    res.status(201).json({ 
      _id: user._id, 
      name: user.name, 
      email: user.email, 
      isAdmin: false, // Frontend ko bhi explicitly false hi bhejo
      token 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user._id }, 'NEXUS_SECRET_KEY', { expiresIn: '30d' });
      
      res.json({ 
        _id: user._id, 
        name: user.name, 
        email: user.email, 
        isAdmin: user.isAdmin || false, // Fallback to false
        token 
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
