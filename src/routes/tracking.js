const router = require('express').Router();
const User = require('../models/user');
const DeviceDetector = require('device-detector-js');
const deviceDetector = new DeviceDetector();
const publicIp = require('public-ip')
const geoip = require('geoip-lite');

// @desc    Create new user from their data
// @route   GET /track
// @access  Public
router.get('/track', async (req,res)=>{
    const targetURL = req.query.targetURL; // gets the target url from query
    const userAgent = req.headers['user-agent']; // gets the user agent from the request headers
    const device = deviceDetector.parse(userAgent); // gets the type of user agent
    const ip = await publicIp.v4(); // gets the public ip v4
    const country = geoip.lookup(ip); //gets the country of the user

    // creates a new User
    try{
        const user = await User({
            url: targetURL,
            deviceType: device.device.type,
            country: country.country
        }).save();
        console.log('User created successfully');
    }
    catch(err){
        console.log('Some sort of error: '+err);
    }

    // redirect to targetURL
    res.redirect(targetURL);

})

// @desc    Fetch the stored user data from the database
// @route   GET /trackingStats
// @access  Public
router.get('/trackingStats', async (req,res)=>{
    const url = req.query.url; // get url from query params
    const rangeFrom = req.query.rangeFrom; // gets rangeFrom Date (format: DDMMYY)
    const rangeTo = req.query.rangeTo; // gets rangeTo Date (format: DDMMYY)

    // extracting the data from the string and converting to necessary format
    const rangeFromYear = parseInt(rangeFrom.slice(4,8));
    const rangeFromMonth = parseInt(rangeFrom.slice(2,4));
    const rangeFromDay = parseInt(rangeFrom.slice(0,2));

    const rangeToYear = rangeTo.slice(4,8);
    const rangeToMonth = rangeTo.slice(2,4);
    const rangeToDay = rangeTo.slice(0,2);
    
    // create Date object from the query string
    const start = new Date(rangeFromYear+'-'+rangeFromMonth+'-'+rangeFromDay);
    start.setHours(0, 0, 0, 0);
    const end =new Date(rangeToYear+'-'+rangeToMonth+'-'+rangeToDay);
    end.setHours(23, 59, 59, 999);

    // fetch the data for specific date range and url
    const data =await User.find(
        {$and: [
            {url: url},
            {timeStamp:{
                $gte: start,
                $lt: end
            }}
        
        ]
    });

    // response as json
    res.json(data);
})

module.exports = router;