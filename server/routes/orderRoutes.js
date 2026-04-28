import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

// Get All Orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'name email').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

// Create Order
router.post('/', async (req, res) => {
  try {
    const { orderItems, totalPrice, userId } = req.body;
    const order = new Order({ user: userId, orderItems, totalPrice });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: 'Order Creation Failed' });
  }
});

// DELETE Order (Nayi Taqat Admin Ke Liye)
router.delete('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      await order.deleteOne();
      res.json({ message: 'Order cleared successfully' });
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting order' });
  }
});

export default router;
