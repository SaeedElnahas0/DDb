const Author = require('../models/Author');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

const createAuthor = async (req, res) => {
    try {
        const author = await Author.insertMany(req.body);
    res.status(StatusCodes.CREATED).json({ author });
    } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
    }
};

const getAllAuthors = async (req, res) => {
    try {
        const author = await Author.find({}).populate("book");
    res.status(StatusCodes.OK).json({ count: author.length, author });
    } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
    }
};

const updateAuthor = async (req, res) => {
    try {
        const author = await Author.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
            runValidators: true,
        });
        if (!author) {
            throw new CustomError.NotFoundError(`No author with id : ${authorId}`);
        }
        res.status(StatusCodes.OK).json({ msg: 'Success! author updated.', author });
    } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
    }
};

const deleteAuthor = async (req, res) => {
    try {
        const author = await Author.findOne({ _id: req.params.id });
    if (!author) {
        throw new CustomError.NotFoundError(`No book with id : ${authorId}`);
    }
    await author.remove();
    res.status(StatusCodes.OK).json({ msg: 'Success! author removed.' });
    } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
    }
};

module.exports = {
    createAuthor,
    getAllAuthors,
    updateAuthor,
    deleteAuthor
}
