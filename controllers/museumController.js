const Museum = require('../models/Museum');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

const createMuseum = async (req, res) => {
    try {
        const museum = await Museum.insertMany(req.body);
    res.status(StatusCodes.CREATED).json({ museum });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
    }
};

const getAllMuseums = async (req, res) => {
    try {
        const museum = await Museum.find({}).populate("work");
    res.status(StatusCodes.OK).json({ count: museum.length, museum });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
    }
};

const updateMuseum = async (req, res) => {
    try {
        const museum = await Museum.updateOne({ _id: req.params.id }, req.body, {
            new: true,
            runValidators: true,
        });
        if (!museum) {
            throw new CustomError.NotFoundError(`No museum with id : ${museumId}`);
        }
        res.status(StatusCodes.OK).json({ msg: 'Success! museum updated.' });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
    }
};

const deleteMuseum = async (req, res) => {
    try {
        const museum = await Museum.findOneAndDelete({ _id: req.params.id });
    if (!museum) {
        throw new CustomError.NotFoundError(`No museum with id`);
    }
    res.status(StatusCodes.OK).json({ msg: 'Success! museum removed.' });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
    }
};

module.exports = {
    createMuseum,
    getAllMuseums,
    updateMuseum,
    deleteMuseum
}
