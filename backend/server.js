// backend/server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const playerRoutes = require('./routes/playerRoutes');
const pokerNightRoutes = require('./routes/pokerNightRoutes'); 
const authRoutes = require('./routes/auth');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Use routes
app.use('/players', playerRoutes);
app.use('/pokernights', pokerNightRoutes);
app.use('/auth', authRoutes);


const host = '0.0.0.0';
app.listen(port, host, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
