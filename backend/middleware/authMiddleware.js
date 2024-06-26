import jwt from 'jsonwebtoken'; // Import jsonwebtoken module to verify the token when the user makes a request to a protected route

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', ''); // Get the token from the Authorization header of the request and remove the Bearer prefix from the token
  if (!token) {
    return res.status(401).send('Access denied. No token provided.'); // Send a 401 response if the token is not provided in the Authorization header of the request
  }
  try {
    const decoded = jwt.verify(token, 'your_jwt_secret'); // Verify the token using the verify method of the jsonwebtoken module with the secret key used to generate the token
    req.user = decoded; // Set the user object in the request to the decoded token object to access the user ID in the protected route
    next(); // Call the next middleware function in the stack to continue processing the request after verifying the token
  } catch (error) {
    res.status(400).send('Invalid token'); // Send a 400 response if the token is invalid or expired when verifying the token in the protected route
  }
}; // Define an auth middleware function to verify the token in the Authorization header of the request before allowing access to the protected route

export default authMiddleware; // Export the auth middleware function to use it in the app to protect the routes that require authentication