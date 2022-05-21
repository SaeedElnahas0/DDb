const Ssn = require('../models/SSN');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

const createSsn = async (req, res) => {
    const ssn = await Ssn.create(req.body);
    res.status(StatusCodes.CREATED).json({ ssn });
};

const getAllSsn = async (req, res) => {
    const ssn = await Ssn.find({});
    res.status(StatusCodes.OK).json({ count: ssn.length, ssn });
};

const getSingleSsn= async (req, res) => {
    const ssn = await Ssn.findOne({ _id: req.params.id });
    if (!ssn) {
        throw new CustomError.NotFoundError(`No ssn with id : ${ssnId}`);
    }
    res.status(StatusCodes.OK).json({ ssn });
};

const updateSsn = async (req, res) => {
    const ssn = await Ssn.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
    });
    if (!ssn) {
        throw new CustomError.NotFoundError(`No ssn with id : ${ssnId}`);
    }
    res.status(StatusCodes.OK).json({ msg: 'Success! ssn updated.', ssn });
};

const deleteSsn = async (req, res) => {
    const ssn = await Ssn.findOne({ _id: req.params.id });
    if (!ssn) {
        throw new CustomError.NotFoundError(`No ssn with id : ${ssnId}`);
    }
    await ssn.remove();
    res.status(StatusCodes.OK).json({ msg: 'Success! ssn removed.' });
};

module.exports = {
    createSsn,
    getAllSsn,
    getSingleSsn,
    updateSsn,
    deleteSsn
}
