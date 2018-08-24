const Promise = require('bluebird')
const {
  getPlayer,
  getTopPlayers,
  updateCardCount,
  normalizeTag,
} = require('./utils')

const saveTopPlayerCards = async () => {
  const { items: topPlayers } = await getTopPlayers(50)
  return Promise.map(topPlayers, async pl => {
    const player = await getPlayer(normalizeTag(pl.tag))
    await updateCardCount(player, 'topCount')
    return
  })
}

module.exports = saveTopPlayerCards
