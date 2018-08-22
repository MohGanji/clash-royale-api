const { Schema } = require("mongoose");

const schema = new Schema({
  tag: { type: String },
  name: { type: String },
  role: { type: String },
  expLevel: { type: String },
  trophies: { type: Number },
  clanRank: { type: Number },
  previousClanRank: { type: Number },
  donations: { type: Number },
  donationsRecieved: { type: Number },

  at: { type: Date, default: Date.now }
});

module.exports = schema;
