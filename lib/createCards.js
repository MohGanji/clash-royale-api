const Promise = require('bluebird')
const request = require('./request')
const mongo = require('./mongo')

const Card = mongo.model('Card')

async function createCards() {
  const { items: cards } = (await request.get('/cards')).data
  await Promise.map(cards, async card => {
    await Card.findOneAndUpdate(
      { name: card.name },
      { at: Date.now() },
      { upsert: true }
    )
    return
  })
  return
}

module.exports = createCards
