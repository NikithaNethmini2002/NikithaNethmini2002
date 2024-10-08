const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const cartRoutes = require('./routes/carts');
const billRoutes = require('./routes/bills'); // New: Import Bill routes
const trackRoutes = require('./routes/tracks'); // New: Import Track routes
require('dotenv').config();

const serverApp = express(); // Replaced 'app' with 'serverApp'
const PORT = process.env.PORT || 8070;

const MONGODB_URL = process.env.MONGODB_URL;

// Middleware
serverApp.use(cors());
serverApp.use(bodyParser.json());

// MongoDB connection
mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
serverApp.use('/api/carts', cartRoutes);
serverApp.use('/api/bills', billRoutes); // New: Set up Bill routes
serverApp.use('/api/tracks', trackRoutes); // New: Set up Track routes

// Start the server
serverApp.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
