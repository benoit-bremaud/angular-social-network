import Post from './models/Post.js'; // Import the Post model to interact with the posts collection in the database and to perform CRUD operations on the posts collection
import authMiddleware from './middleware/authMiddleware.js'; // Import the authMiddleware function to verify the token in the Authorization header of the request before allowing access to the protected route
import authRouter from './routes/auth.js'; // Import the authRouter middleware to handle the authentication routes in the app
import cors from 'cors'; // Import the cors module to enable CORS in the app
// import dotenv from 'dotenv'; // Import the dotenv module to read environment variables from the .env file
import express from 'express'; // Import the express module to create an Express app
import mongoose from 'mongoose'; // Import the mongoose module to connect to MongoDB and interact with the database

// dotenv.config(); // Load environment variables from the .env file

const app = express(); // Create an Express app
const port = 3000; // Set the port for the server to listen on

app.use(express.json()); // Parse JSON bodies in the requests to be available under the req.body property
app.use(cors()); // Enable CORS in the app to allow cross-origin requests

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/angular-social-network').then(() => {
  console.log('Connected to MongoDB'); // Log a message to the console when the app is connected to MongoDB
}).catch((error) => {
  console.log('Failed to connect to MongoDB', error); // Log an error message to the console if the app fails to connect to MongoDB
}); // Connect to MongoDB using the connect method of the mongoose module with the MongoDB connection string

// Use authentication routes
app.use('/api/auth', authRouter); // Use the authRouter middleware to handle the authentication routes in the app

// Protected route example
app.post('/api/posts', authMiddleware, async (req, res) => {
  const { title, content, author } = req.body; // Destructure the title, content, and author from the request body sent by the user when creating a post
  try {
    const post = new Post({ title, content, author }); // Create a new post object with the title, content, and author to store in the database
    await post.save(); // Save the post object in the database using the save method of the post object to create a new post
    res.status(201).json(post); // Send a success response with the post object when the post is created successfully in the database and the post object is saved
  } catch (error) {
    res.status(400).json('Failed to create post'); // Send an error response if there is an error creating the post in the database or saving the post object
  }
}); // Define a protected route with a POST method to create a new post in the app by creating a new post object with the title, content, and author and saving the post object in the database

// Default route to test the server
app.get('/', (req, res) => {
  res.send('Hello World!'); // Send a response with 'Hello World!' when the user makes a GET request to the root URL
}); // Define a default route to test the server

// Start the server on the specified port
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`); // Log a message to the console when the server is running on the specified port
}); // Start the server on the specified port
