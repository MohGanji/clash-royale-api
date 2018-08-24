const Promise = require('bluebird')
const request = require('./request')
const mongo = require('./mongo')

const Card = mongo.model('Card')

async function createCards() {
  const { items: cards } = (await request.get('/cards')).data
  return Promise.map(cards, async card =>
    Card.findOneAndUpdate({ name: card.name }, {}, { upsert: true })
  )
}

module.exports = createCards
