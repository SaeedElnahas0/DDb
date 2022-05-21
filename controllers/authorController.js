const Author = require('../models/Author');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

const createAuthor = async (req, res) => {
    const author = await Author.insertMany(req.body);
    res.status(StatusCodes.CREATED).json({ author });
};

const getAllAuthors = async (req, res) => {
    const author = await Author.find({});
    res.status(StatusCodes.OK).json({ count: author.length, author });
};

const updateAuthor = async (req, res) => {
    const author = await Author.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
    });
    if (!author) {
        throw new CustomError.NotFoundError(`No author with id : ${authorId}`);
    }
    res.status(StatusCodes.OK).json({ msg: 'Success! author updated.', author });
};

const deleteAuthor = async (req, res) => {
    const author = await Author.findOne({ _id: req.params.id });
    if (!author) {
        throw new CustomError.NotFoundError(`No book with id : ${authorId}`);
    }
    await author.remove();
    res.status(StatusCodes.OK).json({ msg: 'Success! author removed.' });
};

module.exports = {
    createAuthor,
    getAllAuthors,
    updateAuthor,
    deleteAuthor
}
