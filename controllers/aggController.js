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
             _id: null,
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

// const lookup  = async (req, res) => {
//     const agg = await Agg.aggregate([
//         {
//           $lookup:
//             {
//               from: "inventory",
//               localField: "item",
//               foreignField: "sku",
//               as: "inventory_docs"
//             }
//        }
//     ])
//     res.status(StatusCodes.OK).json({ count: agg.length, agg });
// };

module.exports = {
    createAgg,
    addField,
    group,
    match,
    unwind,
    project,
    // lookup
};
