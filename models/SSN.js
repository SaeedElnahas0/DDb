const mongoose = require('mongoose');

const ssnSchema = new mongoose.Schema(
    {
        ssnCode: {
            type: String,
            required: [true, 'Please provide SSN Code'],
        },
        person: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Person",
            required: [true, 'Please provide person id']
        },
        
    },
    { timestamps: true }
);

module.exports = mongoose.model('Ssn', ssnSchema);