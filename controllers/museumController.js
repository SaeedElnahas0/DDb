const Museum = require('../models/Museum');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

const createMuseum = async (req, res) => {
    const museum = await Museum.insertMany(req.body);
    res.status(StatusCodes.CREATED).json({ museum });
};

const getAllMuseums = async (req, res) => {
    const museum = await Museum.find({});
    res.status(StatusCodes.OK).json({ count: museum.length, museum });
};

const updateMuseum = async (req, res) => {
    const museum = await Museum.updateOne({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
    });
    if (!museum) {
        throw new CustomError.NotFoundError(`No museum with id : ${museumId}`);
    }
    res.status(StatusCodes.OK).json({ msg: 'Success! museum updated.' });
};

const deleteMuseum = async (req, res) => {
    const museum = await Museum.findOneAndDelete({ _id: req.params.id });
    if (!museum) {
        throw new CustomError.NotFoundError(`No museum with id`);
    }
    res.status(StatusCodes.OK).json({ msg: 'Success! museum removed.' });
};

module.exports = {
    createMuseum,
    getAllMuseums,
    updateMuseum,
    deleteMuseum
}
