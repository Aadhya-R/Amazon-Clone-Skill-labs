const router = require('express').Router()

// POST /auth/signup
router.post('/signup', (req, res) => {
  res.json({ message: 'signup route working' }) // replace with real logic
})

// POST /auth/login
router.post('/login', (req, res) => {
  res.json({ message: 'login route working' }) // replace with real logic
})

module.exports = router