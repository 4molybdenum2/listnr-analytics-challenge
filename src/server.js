const express = require('express');
const app = express();
const User = require('./models/user');
const DeviceDetector = require('device-detector-js');
const deviceDetector = new DeviceDetector();
const publicIp = require('public-ip')
const geoip = require('geoip-lite');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = require('./config/db');

connectDB();

const PORT = process.env.PORT || 5000;

app.get('/',(req,res)=>{
    res.json({"msg": "Homepage"});
});

app.use('/', require('./routes/tracking'));

app.listen(PORT, ()=>{
    console.log(`Server started on PORT: ${PORT}`);
});
