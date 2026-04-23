const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');

const app = express();
app.use(cors());
app.use(express.json());

// --- DATABASE CONNECTION ---
let dbConnected = false;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected');
    dbConnected = true;
  })
  .catch(err => {
    console.log('❌ DB Error: ' + err.message);
    console.log('⚠️ Running in MOCK MODE (Local Data Only)');
  });

// --- MOCK DATA FOR DEMO ---
const mockProducts = [
  { _id: '1', title: 'iPhone 15 Pro', price: 129900, image: 'https://m.media-amazon.com/images/I/81SigAnN7KL._AC_SL1500_.jpg', description: 'Latest Apple iPhone with Titanium design.' },
  { _id: '2', title: 'Sony WH-1000XM5', price: 29990, image: 'https://m.media-amazon.com/images/I/51aBv7SXYfL._AC_SL1200_.jpg', description: 'Industry leading noise canceling headphones.' },
  { _id: '3', title: 'Samsung S24 Ultra', price: 124999, image: 'https://m.media-amazon.com/images/I/71RVuS3q9QL._AC_SL1500_.jpg', description: 'Powerful Android phone with AI features.' },
  { _id: '4', title: 'MacBook Air M3', price: 114900, image: 'https://m.media-amazon.com/images/I/71f5Eu5lJSL._AC_SL1500_.jpg', description: 'Supercharged by M3 chip, thin and light.' },
];

let mockCart = { items: [] };

// --- MOCK ROUTES (Only active if DB fails) ---
const handleMock = (req, res, next) => {
  if (!dbConnected) return next();
  next();
};

app.use('/products', (req, res, next) => {
  if (!dbConnected && req.method === 'GET') {
    if (req.path === '/' || req.path === '') {
      console.log('📦 Serving MOCK Products');
      return res.json(mockProducts);
    }
    const id = req.path.split('/')[1];
    const product = mockProducts.find(p => p._id === id);
    if (product) {
      console.log(`📦 Serving MOCK Product: ${id}`);
      return res.json(product);
    }
  }
  next();
});

app.use('/auth/login', (req, res, next) => {
  if (!dbConnected && req.method === 'POST') {
    console.log('🔑 Mock Login');
    return res.json({ token: 'mock-jwt-token', name: 'Demo User', userId: 'mock-123' });
  }
  next();
});

// --- REAL ROUTES ---
app.get('/', (req, res) => res.send('API is Online (Database: ' + (dbConnected ? 'Connected' : 'Offline/Mock Mode') + ')'));
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));