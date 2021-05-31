const router = require('express').Router();

router.get('/track', async (req,res)=>{
    const targetURL = req.query.targetURL;
    const userAgent = req.headers['user-agent'];
    const device = deviceDetector.parse(userAgent);
    const ip = await publicIp.v4();
    const country = geoip.lookup(ip);

    console.log(country.country);
    console.log(device.device.type);

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

    res.redirect(targetURL);

})

router.get('/trackingStats', async (req,res)=>{
    const url = req.query.url;
    const rangeFrom = req.query.rangeFrom;
    const rangeTo = req.query.rangeTo;

    const rangeFromYear = parseInt(rangeFrom.slice(4,8));
    const rangeFromMonth = parseInt(rangeFrom.slice(2,4));
    const rangeFromDay = parseInt(rangeFrom.slice(0,2));

    const rangeToYear = rangeTo.slice(4,8);
    const rangeToMonth = rangeTo.slice(2,4);
    const rangeToDay = rangeTo.slice(0,2);
    
    const start = new Date(rangeFromYear+'-'+rangeFromMonth+'-'+rangeFromDay);
    start.setHours(0, 0, 0, 0);
    const end =new Date(rangeToYear+'-'+rangeToMonth+'-'+rangeToDay);
    end.setHours(23, 59, 59, 999);

    const data =await User.find(
        {$and: [
            {url: url},
            {timeStamp:{
                $gte: start,
                $lt: end
            }}
        
        ]
    });

    res.json(data);
})

module.exports = router;