const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // 1. Get token from the request header (typically passed as "Authorization")
  const token = req.header('Authorization');

  // 2. Check if no token exists
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // 3. Verify the token
  try {
    // If the token is sent as "Bearer <token>", we extract just the token part
    const decodedToken = token.startsWith('Bearer ') ? token.split(' ')[1] : token;
    
    // Verify using the secret key from your .env file
    const decoded = jwt.verify(decodedToken, process.env.JWT_SECRET);
    
    // 4. Add the user data (like userId) to the request object so routes can use it
    req.user = decoded;
    
    // 5. Move to the next step (the actual API route)
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;