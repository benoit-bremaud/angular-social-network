import User from '../models/User.js'; // Import the User model to interact with the users collection in the database and to perform CRUD operations on the users collection
import bcrypt from 'bcrypt'; // Import bcrypt module to hash passwords before storing them in the database and to compare the hashed password with the password provided by the user during login
import express from 'express'; // Import express module to use its Router method to create routes in the app
import jwt from 'jsonwebtoken'; // Import jsonwebtoken module to generate a token for the user when they log in successfully and to verify the token when the user makes a request to a protected route

const router = express.Router(); // Create a new router using the Router method of the express module to define routes for the app

// Register route
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body; // Destructure the username, email, and password from the request body sent by the user when they register
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password using the bcrypt module with a salt of 10 rounds before storing it in the database to ensure that the password is secure
    const user = new User({ username, email, password: hashedPassword }); // Create a new user object with the username, email, and hashed password to store in the database
    await user.save(); // Save the user object in the database using the save method of the user object to register the user
    res.status(201).send(user); // Send a success response with the user object when the user is registered successfully in the database and the user object is saved
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(400).send('Error registering user'); // Send an error response if there is an error registering the user in the database or saving the user object
  }
}); // Define the register route with a POST method to register a new user in the app by creating a new user object with the username, email, and hashed password and saving the user object in the database

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body; // Destructure the email and password from the request body sent by the user when they log in
  try {
    const user = await User.findOne({ email }); // Find a user with the email provided by the user during login using the findOne method of the User model
    if (!user) {
      return res.status(404).send('User not found'); // Send a 404 response if the user with the email provided by the user during login is not found in the database
    }
    const isPasswordValid = await bcrypt.compare(password, user.password); // Compare the password provided by the user during login with the hashed password stored in the database using the compare method of the bcrypt module
    if (!isPasswordValid) {
      return res.status(401).send('Invalid password'); // Send a 401 response if the password provided by the user during login is invalid
    }
    const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' }); // Generate a token for the user with the user ID using the sign method of the jsonwebtoken module with a secret key and an expiration time of 1 hour
    res.json({ token }); // Send the token in the response as a JSON object when the user logs in successfully
  } catch (error) {
    res.status(400).send('Error logging in'); // Send an error response if there is an error logging in the user or generating the token for the user
  }
}); // Define the login route with a POST method to log in a user in the app by finding the user with the email provided by the user during login, comparing the password provided by the user with the hashed password stored in the database, and generating a token for the user when the user logs in successfully

export default router; // Export the router to use it in the app to define the auth routes for the app