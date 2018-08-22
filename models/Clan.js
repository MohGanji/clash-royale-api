const { Schema } = require("mongoose");

const schema = new Schema({
  tag: { type: String },
  name: { type: String },
  clanScore: { type: Number },
  donationsPerWeek: { type: Number },
  members: { type: Number },

  at: { type: Date, default: Date.now }
});

module.exports = schema;
