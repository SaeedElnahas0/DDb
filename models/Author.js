const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide name'],
        },
        email: {
            type: String,
            required: [true, 'Please provide place'],
        },
        address: {
            type: String,
            required: [true, 'Please provide address'],
        },
        book: 
        [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Book",
                required: [true, 'Please provide book id']
            }
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model('Author', authorSchema);