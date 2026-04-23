const router = require('express').Router();
const Product = require('../models/Product');

// GET /products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.log('⚠️ DB Fetch failed, attempting mock data fallback...');
    // Fallback: If DB is down, we return the mock data handled in index.js
    // Or if index.js didn't catch it, we handle it here
    res.status(500).json({ message: 'Server error fetching products' });
  }
});

// GET /products/:id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching product' });
  }
});

module.exports = router;