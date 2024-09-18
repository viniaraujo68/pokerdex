// backend/server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const playerRoutes = require('./routes/playerRoutes'); // Import player routes
const pokerNightRoutes = require('./routes/pokerNightRoutes'); // Import poker night routes

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Use routes
app.use('/api/players', playerRoutes); // Prefix player routes with /api/players
app.use('/api/pokernights', pokerNightRoutes); // Prefix poker night routes with /api/pokernights

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});