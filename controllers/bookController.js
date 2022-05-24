const Book = require('../models/Book');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

const createBook = async (req, res) => {
    try {
        const book = await Book.create(req.body);
    res.status(StatusCodes.CREATED).json({ book });
    } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
    }
};

const getAllBooks = async (req, res) => {
    try {
        const book = await Book.find({}).populate("author");
    res.status(StatusCodes.OK).json({ count: book.length, book });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
    }
};

const updateBook = async (req, res) => {
    try {
        const book = await Book.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
            runValidators: true,
        });
        if (!book) {
            throw new CustomError.NotFoundError(`No book with id : ${bookId}`);
        }
        res.status(StatusCodes.OK).json({ msg: 'Success! book updated.', book });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
    }
};

const deleteBook = async (req, res) => {
    try {
        const book = await Book.findOne({ _id: req.params.id });
    if (!book) {
        throw new CustomError.NotFoundError(`No book with id : ${bookId}`);
    }
    await book.remove();
    res.status(StatusCodes.OK).json({ msg: 'Success! book removed.' });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
    }
};

module.exports = {
    createBook,
    getAllBooks,
    updateBook,
    deleteBook
}
