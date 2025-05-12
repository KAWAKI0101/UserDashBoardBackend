const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Import routes
const userRoutes = require('./routes/user.routes.js');
app.use('/api/users', userRoutes);

// MongoDB connection using mongoose
const mongoURI = process.env.MONGO_URI; // Fetch the Mongo URI from environment variables

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log('Database connection failed:', err));

// Start Server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));