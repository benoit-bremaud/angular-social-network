import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = 3000;

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/angular-social-network').then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.log('Failed to connect to MongoDB', error);
});

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
