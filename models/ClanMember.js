const { Schema } = require("mongoose");

const schema = new Schema({
  member: { type: Schema.Types.ObjectId },
  clan: { type: Schema.Types.ObjectId },
  at: { type: Date, default: Date.now }
});

module.exports = schema;
