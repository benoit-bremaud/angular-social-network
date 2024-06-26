import jwt from 'jsonwebtoken'; // Import jsonwebtoken package for token verification and decoding

// Middleware to authenticate user
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', ''); // Get token from header
  if (!token) {
    return res.status(401).send('Access denied. No token provided.'); // If no token, return 401
  }
  try {
    const decoded = jwt.verify(token, 'your_jwt_secret'); // Verify token
    req.user = decoded; // Set user in request object
    next(); // Call next middleware
  } catch (error) {
    res.status(400).send('Invalid token'); // If token is invalid, return 400 status code with message 'Invalid token'
  }
};

export default authMiddleware; // Export middleware for use in other files
