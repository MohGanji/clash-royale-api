const { Schema } = require("mongoose");

const schema = new Schema({
  name: { type: String },
  player: { type: Schema.Types.ObjectId },
  level: { type: Number },
  count: { type: Number },

  at: { type: Date, default: Date.now }
});

module.exports = schema;
