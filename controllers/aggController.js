const Agg = require("../models/Agg");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const createAgg = async (req, res) => {
  const agg = await Agg.create(req.body);
  res.status(StatusCodes.CREATED).json({ agg });
};

const addField = async (req, res) => {
    const agg = await Agg.aggregate([
        {
        $addFields: {
            totalHomework: { $sum: "$homework" },
            totalQuiz: { $sum: "$quiz" },
        },
        },
        {
        $addFields: { totalScore: { $add: ["$totalHomework", "$totalQuiz"] } },
        },
    ]);
    res.status(StatusCodes.OK).json({ count: agg.length, agg });
};

const group = async (req, res) => {
    const agg = await Agg.aggregate( [
        {
          $group: {
             _id: "$student",
             count: { $sum: 1 }
          }
        }
    ])
    res.status(StatusCodes.OK).json({ count: agg.length, agg });
};

const match = async (req, res) => {
    const agg = await Agg.aggregate([ 
        { 
            $match : { homework : { $gt: 10} } 
        }
    ])
    res.status(StatusCodes.OK).json({ count: agg.length, agg });
};

const unwind = async (req, res) => {
    const agg = await Agg.aggregate( [ { $unwind : "$homework" } ] )
    res.status(StatusCodes.OK).json({ count: agg.length, agg });
};

const project  = async (req, res) => {
    const agg = await Agg.aggregate( [ { $project : { _id: 0, homework : 1 } } ] )
    res.status(StatusCodes.OK).json({ count: agg.length, agg });
};

const lookup  = async (req, res) => {
    const agg = await Agg.aggregate([
        {
          $lookup:
            {
              from: "authors",
              localField: "student",
              foreignField: "name",
              as: "output"
            }
       }
    ])
    res.status(StatusCodes.OK).json({ count: agg.length, agg });
};

const getAllAggs = async (req, res) => {
    const agg = await Agg.find({});
    res.status(StatusCodes.OK).json({ count: agg.length, agg });
};

//soft delete
const softDeleteAgg = async (req, res) => {
    const agg = await Agg.softDelete({ _id: req.params.id });
    if (!agg) {
        throw new CustomError.NotFoundError(`No agg with id : ${aggId}`);
    }
    res.status(StatusCodes.OK).json({ msg: 'Success! agg removed.' });
};

const allAggregation = async (req, res) => {
    const agg = await Agg.aggregate([
        {
            $match : { student : "saeed" } 
        },
        {
            $addFields: {
                totalHomework: { $sum: "$homework" },
                totalQuiz: { $sum: "$quiz" },
            },
            },
            {
            $addFields: { totalScore: { $add: ["$totalHomework", "$totalQuiz"] } },
        },
        { $unwind : "$homework" },


    ])
    res.status(StatusCodes.OK).json({ agg });
}

module.exports = {
    createAgg,
    addField,
    group,
    match,
    unwind,
    project,
    lookup,
    getAllAggs,
    softDeleteAgg,
    allAggregation
};
