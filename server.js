const express = require("express");
const mongoose =  require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

//Load env
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json())

//Import 
const userRoutes = require('./routes/user.routes.js');
app.use('/api/users', userRoutes);


// Db connection
const connectDb = require('./config/Db');
connectDb();


// Start Server
const PORT =  process.env.PORT || 10000;
app.listen(PORT,() => console.log(`Server running on port ${PORT}`));
