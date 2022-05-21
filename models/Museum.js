const mongoose = require('mongoose');

const museumSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide name'],
        },
        location: {
            type: String,
            required: [true, 'Please provide location'],
        },
        photo: {
            type: String,
            required: [true, 'Please provide place'],
        },
        work: 
        [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Work",
                required: [true, 'Please provide work id']
            }
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model('Museum', museumSchema);