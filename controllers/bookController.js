const Book = require('../models/Book');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

const createBook = async (req, res) => {
    const book = await Book.create(req.body);
    res.status(StatusCodes.CREATED).json({ book });
};

const getAllBooks = async (req, res) => {
    const book = await Book.find({});
    res.status(StatusCodes.OK).json({ count: book.length, book });
};

const updateBook = async (req, res) => {
    const book = await Book.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
    });
    if (!book) {
        throw new CustomError.NotFoundError(`No book with id : ${bookId}`);
    }
    res.status(StatusCodes.OK).json({ msg: 'Success! book updated.', book });
};

const deleteBook = async (req, res) => {
    const book = await Book.findOne({ _id: req.params.id });
    if (!book) {
        throw new CustomError.NotFoundError(`No book with id : ${bookId}`);
    }
    await book.remove();
    res.status(StatusCodes.OK).json({ msg: 'Success! book removed.' });
};

module.exports = {
    createBook,
    getAllBooks,
    updateBook,
    deleteBook
}
