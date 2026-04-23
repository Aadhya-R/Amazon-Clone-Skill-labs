const express    = require('express')
const mongoose   = require('mongoose')
const cors       = require('cors')
require('dotenv').config()

const authRoutes     = require('./routes/auth')
const productRoutes  = require('./routes/products')
const cartRoutes     = require('./routes/cart')

const app = express()
app.use(cors())
app.use(express.json())

// Routes
app.use('/auth',     authRoutes)
app.use('/products', productRoutes)
app.use('/cart',     cartRoutes)

// DB Connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log('❌ DB Error:', err))

app.listen(5000, () => console.log('✅ Server running on http://localhost:5000'))