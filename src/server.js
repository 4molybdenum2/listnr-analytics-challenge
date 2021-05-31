const express = require('express');
const app = express();
const dotenv = require('dotenv');

dotenv.config();

// database configuration
const connectDB = require('./config/db');

connectDB();


// PORT configuration
const PORT = process.env.PORT || 5000;

// @desc    Access the home URL
// @route   GET /
// @access  Public
app.get('/',(req,res)=>{
    res.json({"msg": "Homepage"});
});

// endpoints for tracking
app.use('/', require('./routes/tracking'));

app.listen(PORT, ()=>{
    console.log(`Server started on PORT: ${PORT}`);
});
