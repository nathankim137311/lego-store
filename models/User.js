const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        max: 255,
    },
    password: {
        type: String,
        required: true,
        min: 10,
        max: 1024
    },
    country: {
        type: String,
        required: true,
    },
    token: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema); 

