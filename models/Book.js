const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide name'],
        },
        type: {
            type: String,
            required: [true, 'Please provide location'],
        },
        photo: {
            type: String,
            required: [true, 'Please provide place'],
        },
        author: 
        [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Author",
                required: [true, 'Please provide author id']
            }
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model('Book', bookSchema);