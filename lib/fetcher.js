const Promise = require('bluebird')
const mongo = require('./mongo')
const saveTopPlayerCards = require('./topPlayers')
const {
  getMyClan,
  getMyClanMembers,
  getPlayer,
  getPlayerBattles,
  updateCardCount,
  saveBattles,
  normalizeTag,
} = require('./utils')

const Clan = mongo.model('Clan')
const Member = mongo.model('Member')
const Player = mongo.model('Player')
const PlayerDeck = mongo.model('PlayerDeck')

async function fetcher() {
  const clan = await getMyClan()
  await Clan.create({ ...clan })

  const { items: clanPlayers } = await getMyClanMembers()
  await Promise.map(clanPlayers, async member => {
    await Member.create({ ...member })

    const player = await getPlayer(normalizeTag(member.tag))
    const { _id: playerId } = await Player.create({ ...player })

    await PlayerDeck.create({ player: playerId, cards: player.currentDeck })
    await updateCardCount(player, 'clanCount')
    const battles = await getPlayerBattles(normalizeTag(member.tag))
    await saveBattles(playerId, battles)
    return
  })
  await saveTopPlayerCards()

  return
}

module.exports = fetcher
