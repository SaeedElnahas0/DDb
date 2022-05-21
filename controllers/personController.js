const Person = require('../models/Person');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

const createPerson = async (req, res) => {
    const person = await Person.create(req.body);
    res.status(StatusCodes.CREATED).json({ person });
};

const getAllPersons = async (req, res) => {
    const person = await Person.find({});
    res.status(StatusCodes.OK).json({ count: person.length, person });
};

const getSinglePerson = async (req, res) => {
    const person = await Person.findOne({ _id: req.params.id });
    if (!person) {
        throw new CustomError.NotFoundError(`No person with id : ${personId}`);
    }
    res.status(StatusCodes.OK).json({ person });
};

const updatePerson = async (req, res) => {
    const person = await Person.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
    });
    if (!person) {
        throw new CustomError.NotFoundError(`No person with id : ${personId}`);
    }
    res.status(StatusCodes.OK).json({ msg: 'Success! person updated.', person });
};

const deletePerson = async (req, res) => {
    const person = await Person.findOne({ _id: req.params.id });
    if (!person) {
        throw new CustomError.NotFoundError(`No person with id : ${personId}`);
    }
    await person.remove();
    res.status(StatusCodes.OK).json({ msg: 'Success! person removed.' });
};

module.exports = {
    createPerson,
    getAllPersons,
    getSinglePerson,
    updatePerson,
    deletePerson
}
