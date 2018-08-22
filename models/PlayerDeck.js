const { Schema } = require("mongoose");

const schema = new Schema({
  cards: { type: Array },
  player: { type: Schema.Types.ObjectId },

  at: { type: Date, default: Date.now }
});

module.exports = schema;
