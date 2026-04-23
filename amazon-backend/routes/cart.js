const router = require('express').Router()

// POST /cart
router.post('/', (req, res) => {
  res.json({ message: 'add to cart' }) // replace with real logic
})

// DELETE /cart
router.delete('/', (req, res) => {
  res.json({ message: 'remove from cart' }) // replace with real logic
})

// PUT /cart
router.put('/', (req, res) => {
  res.json({ message: 'update cart' }) // replace with real logic
})

module.exports = router