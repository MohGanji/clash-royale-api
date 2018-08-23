const { Schema } = require('mongoose')

const schema = new Schema({
  name: { type: String },
  clanCount: { type: Number, default: 0 },
  topCount: { type: Number, default: 0 },

  at: { type: Date, default: Date.now },
})

module.exports = schema
