const mongoose = require('mongoose');

const personSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide person name'],
        },
        email: {
            type: String,
            required: [true, 'Please provide person email'],
        },
        address: {
            type: String,
            required: [true, 'Please provide person address'],
        },
        phone: {
            type: String,
            required: [true, 'Please provide person phone'],
        },
        gender: {
            type: String,
            required: [true, 'Please provide person gender'],
            enum: ['male', 'female'],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Person', personSchema);