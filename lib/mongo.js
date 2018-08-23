const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

mongoose.connect(
  'mongodb://mongo:27017/ClashRoyale',
  {
    poolSize: 2,
    useNewUrlParser: true,
  }
)
const modelsDirPath = path.join(__dirname, '..', 'models')
const models = fs.readdirSync(modelsDirPath)
models.forEach(m => {
  const [modelName] = m.split('.')
  const schema = require(path.join(modelsDirPath, modelName))
  mongoose.model(modelName, schema)
})

module.exports = mongoose
