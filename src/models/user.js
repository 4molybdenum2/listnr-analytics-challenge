const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    url:{
        type: String,
        required: true
    },
    timeStamp:{
        type: Date,
        default: Date.now(),
        required: true
    },
    deviceType:{
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', UserSchema);
