const query = `
db.getCollection('members').aggregate([
  {
    $group: {
      _id: { tag: '$tag', name: '$name' },
      clanRankAvg: { $avg: '$clanRank' },
      donationAvg: { $avg: '$donations' },
      trophiesAvg: { $avg: '$trophies' },
    },
  },
  { $sort: { donationAvg: 1 } },
])`

module.exports = query
