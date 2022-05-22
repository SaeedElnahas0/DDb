const mongoose = require('mongoose');

const aggSchema = new mongoose.Schema(
    {
        student: {
            type: String,
            required: [true, 'Please provide student'],
        },
        homework: [],
        quiz: [] 
    },
    { timestamps: true }
);

module.exports = mongoose.model('Agg', aggSchema);