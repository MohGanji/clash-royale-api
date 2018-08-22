const { Schema } = require("mongoose");

const schema = new Schema({
  player: { type: Schema.Types.ObjectId },
  battleType: { type: String },
  gameMode: { type: String },
  status: { type: String, enum: ["win", "draw", "lose"] },
  crowns: { type: Number },
  opponentCrowns: { type: Number },

  at: { type: Date }
});

module.exports = schema;
