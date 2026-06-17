const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    slot: {
        type: String,
        default: ""
    },

    vehicleNumber: {
        type: String,
        default: ""
    },

    vehicleType: {
        type: String,
        default: ""
    },

    vehicleModel: {
        type: String,
        default: ""
    },

    fuelType: {
        type: String,
        default: ""
    },

    vehicleInfoCompleted: {
        type: Boolean,
        default: false
    },
    
    complaintRaised: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);