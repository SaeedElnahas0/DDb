const Ssn = require('../models/SSN');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

const createSsn = async (req, res) => {
    try {
        const ssn = await Ssn.create(req.body);
    res.status(StatusCodes.CREATED).json({ ssn });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
    }
};

const getAllSsn = async (req, res) => {
    try {
        const ssn = await Ssn.find({}).populate("person");
    res.status(StatusCodes.OK).json({ count: ssn.length, ssn });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
    }
};

const getSingleSsn= async (req, res) => {
    try {
        const ssn = await Ssn.findOne({ _id: req.params.id }).populate("person");
    if (!ssn) {
        throw new CustomError.NotFoundError(`No ssn with id : ${ssnId}`);
    }
    res.status(StatusCodes.OK).json({ ssn });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
    }
};

const updateSsn = async (req, res) => {
    try {
        const ssn = await Ssn.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
            runValidators: true,
        });
        if (!ssn) {
            throw new CustomError.NotFoundError(`No ssn with id : ${ssnId}`);
        }
        res.status(StatusCodes.OK).json({ msg: 'Success! ssn updated.', ssn });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
    }
};

const deleteSsn = async (req, res) => {
    try {
        const ssn = await Ssn.findOne({ _id: req.params.id });
    if (!ssn) {
        throw new CustomError.NotFoundError(`No ssn with id : ${ssnId}`);
    }
    await ssn.remove();
    res.status(StatusCodes.OK).json({ msg: 'Success! ssn removed.' })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
    };
};

module.exports = {
    createSsn,
    getAllSsn,
    getSingleSsn,
    updateSsn,
    deleteSsn
}
