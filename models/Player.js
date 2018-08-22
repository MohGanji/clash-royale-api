const { Schema } = require("mongoose");

const schema = new Schema({
  tag: { type: String },
  name: { type: String },
  role: { type: String },
  expLevel: { type: String },
  trophies: { type: Number },
  bestTrophies: { type: Number },
  wins: { type: Number },
  losses: { type: Number },
  battleCount: { type: Number },
  threeCrownWins: { type: Number },
  challengeCardsWon: { type: Number },
  challengeMaxWins: { type: Number },
  tournamentCardsWon: { type: Number },
  tournamentBattleCount: { type: Number },
  totalDonations: { type: Number },
  clanCardsCollected: { type: Number },
  warDayWins: { type: Number },

  at: { type: Date, default: Date.now }
});

module.exports = schema;
