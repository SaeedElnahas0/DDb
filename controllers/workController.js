const Work = require('../models/Work');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

const createWork = async (req, res) => {
    const work = await Work.insertMany(req.body);
    res.status(StatusCodes.CREATED).json({ work });
};

const getAllWorks = async (req, res) => {
    const work = await Work.find({});
    res.status(StatusCodes.OK).json({ count: work.length, work });
};

const getSingleWork= async (req, res) => {
    const work = await Work.findOne({ _id: req.params.id });
    if (!work) {
        throw new CustomError.NotFoundError(`No work with id : ${workId}`);
    }
    res.status(StatusCodes.OK).json({ work });
};

const updateWork = async (req, res) => {
    const work = await Work.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
    });
    if (!work) {
        throw new CustomError.NotFoundError(`No work with id : ${workId}`);
    }
    res.status(StatusCodes.OK).json({ msg: 'Success! work updated.', work });
};

const deleteWork = async (req, res) => {
    const work = await Work.findOneAndDelete({ _id: req.params.id });
    if (!work) {
        throw new CustomError.NotFoundError(`No work with id`);
    }
    // await work.remove();
    res.status(StatusCodes.OK).json({ msg: 'Success! work removed.' });
};

module.exports = {
    createWork,
    getAllWorks,
    getSingleWork,
    updateWork,
    deleteWork
}
