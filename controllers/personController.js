const Person = require("../models/Person");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const createPerson = async (req, res) => {
  try {
    const person = await Person.create(req.body);
    res.status(StatusCodes.CREATED).json({ person });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
  }
};

const getAllPersons = async (req, res) => {
  try {
    const person = await Person.find({});
    res.status(StatusCodes.OK).json({ count: person.length, person });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
  }
};

const getSinglePerson = async (req, res) => {
  try {
    const person = await Person.findOne({ _id: req.params.id });
    if (!person) {
      throw new CustomError.NotFoundError(`No person with id : ${personId}`);
    }
    res.status(StatusCodes.OK).json({ person });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
  }
};

const updatePerson = async (req, res) => {
  try {
    const person = await Person.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!person) {
      throw new CustomError.NotFoundError(`No person with id : ${personId}`);
    }
    res
      .status(StatusCodes.OK)
      .json({ msg: "Success! person updated.", person });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
  }
};

const deletePerson = async (req, res) => {
  try {
    const person = await Person.findOne({ _id: req.params.id });
    if (!person) {
      throw new CustomError.NotFoundError(`No person with id : ${personId}`);
    }
    await person.remove();
    res.status(StatusCodes.OK).json({ msg: "Success! person removed." });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
  }
};

module.exports = {
  createPerson,
  getAllPersons,
  getSinglePerson,
  updatePerson,
  deletePerson,
};
