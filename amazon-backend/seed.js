require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const dummyProducts = [
  { title: 'iPhone 15', price: 79999, image: 'https://via.placeholder.com/200', description: 'Latest Apple iPhone with advanced camera features.' },
  { title: 'Samsung TV', price: 45000, image: 'https://via.placeholder.com/200', description: '4K Ultra HD Smart LED TV for your living room.' },
  { title: 'Nike Shoes', price: 4999, image: 'https://via.placeholder.com/200', description: 'Comfortable and stylish running shoes.' },
  { title: 'Laptop', price: 65000, image: 'https://via.placeholder.com/200', description: 'High performance laptop for work and gaming.' },
  { title: 'Headphones', price: 2999, image: 'https://via.placeholder.com/200', description: 'Noise cancelling wireless headphones.' }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ MongoDB connected');
    
    // Clear existing products to prevent duplicates if run multiple times
    await Product.deleteMany({});
    console.log('Cleared existing products');
    
    // Insert new dummy products
    await Product.insertMany(dummyProducts);
    console.log('✅ Dummy products inserted successfully!');
    
    // Disconnect and exit
    mongoose.disconnect();
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ DB Error:', err);
    process.exit(1);
  });
