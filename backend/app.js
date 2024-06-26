import Post from './models/Post.js'; // Import the Post model from the models folder in the same directory
import authMiddleware from './middleware/authMiddleware.js'; // Import the authMiddleware from the middleware folder in the same directory
import authRoutes from './routes/auth.js'; // Import the authRoutes from the routes folder in the same directory
import express from 'express'; // Import express package for creating the server instance and handling routes and requests from the client
import mongoose from 'mongoose'; // Import mongoose package for connecting to MongoDB database and interacting with it using models and schemas

const app = express(); // Create an instance of the express server to handle requests and responses from the client
const port = 3000; // Set the port number for the server to listen on for incoming requests from the client application (e.g., Angular app)

app.use(express.json()); // Use express middleware to parse JSON data from the request body of incoming requests from the client 

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/angular-social-network').then(() => {
  console.log('Connected to MongoDB'); // Log a message to the console if the connection to MongoDB is successful
}).catch(err => {
  console.error('Error connecting to MongoDB', err); // Log an error message to the console if there is an error connecting to MongoDB
}); // Connect to the MongoDB database using the connection string 'mongodb://localhost:27017/angular-social-network'

// Use authentication routes
app.use('/api/auth', authRoutes); // Use the authRoutes for handling authentication-related routes (e.g., register, login)

// Protected route example
app.post('/api/posts', authMiddleware, async (req, res) => {
  const { title, content, author } = req.body; // Get the title, content, and author from the request body
  try {
    const post = new Post({ title, content, author }); // Create a new post object with the title, content, and author from the request body
    await post.save(); // Save the post to the database using the save method 
    res.status(201).send(post); // Send a 201 status code with the post object in the response
  } catch (error) {
    res.status(400).send('Error creating post'); // Send a 400 status code with an error message if there is an error creating the post
  }
}); // Create a new post using the Post model and save it to the database with the title, content, and author from the request body 

app.get('/', (req, res) => {
  res.send('Hello World!'); // Send a 'Hello World!' message to the client when they make a GET request to the root URL '/' of the server 
}); // Handle a GET request to the root URL '/' of the server and send a response with 'Hello World!' message

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`); // Log a message to the console when the server is running and listening for incoming requests on the specified port
}); // Start the server and listen for incoming requests on the specified port number