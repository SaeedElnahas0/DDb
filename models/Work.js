const mongoose = require('mongoose');

const workSchema = new mongoose.Schema(
    {
        workName: {
            type: String,
            required: [true, 'Please provide work name'],
        },
        type: {
            type: String,
            required: [true, 'Please provide type'],
        },
        place: {
            type: String,
            required: [true, 'Please provide place'],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Work', workSchema);