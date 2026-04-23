const router = require('express').Router()

// GET /products
router.get('/', (req, res) => {
  res.json([]) // replace with DB fetch
})

// GET /products/:id
router.get('/:id', (req, res) => {
  res.json({}) // replace with DB fetch
})

module.exports = router