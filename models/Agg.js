const mongoose = require('mongoose');
const { softDeletePlugin } = require('soft-delete-plugin-mongoose');

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

aggSchema.plugin(softDeletePlugin);
module.exports = mongoose.model('Agg', aggSchema);