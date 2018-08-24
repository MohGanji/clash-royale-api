const query = `
db.getCollection('battlestatuses').aggregate([
  {
      $lookup:{
             from: "players",
             localField: "player",
             foreignField: "_id",
             as: "pl"
      }
  },
  {$unwind: "$pl"},
  {
      $group: {
              _id: {player: "$pl._id", name: "$pl.name"},
              crownAvg: {$avg: "$crowns"},
              opponentCrownAvg: {$avg: "$opponentCrowns"},
              status: {$push : "$status"}
              
      }
  },
  { $sort: {crownAvg: -1}},
  { $group: { _id: null, count: { $sum: 1 } } }
])
`
// last line is to get count of the result
// TODO: I need to check the data and see if battleStatus is working correctly!

module.exports = query
