const Promise = require('bluebird')
const request = require('./request')
const mongo = require('./mongo')

const Card = mongo.model('Card')
const BattleStatus = mongo.model('BattleStatus')

const clantag = '%238QQGQ9R0'

const getMyClan = async () => {
  return (await request.get(`/clans/${clantag}`)).data
}

const getMyClanMembers = async () => {
  return (await request.get(`/clans/${clantag}/members`)).data
}

const getPlayer = async playerTag => {
  return (await request.get(`/players/${playerTag}`)).data
}

const getPlayerBattles = async playerTag => {
  return (await request.get(`/players/${playerTag}/battlelog`)).data
}

const updateCardCount = async (player, field) => {
  return Promise.map(player.currentDeck, async card =>
    Card.findOneAndUpdate({ name: card.name }, { $inc: { [field]: 1 } })
  )
}

const saveBattles = async (player, battles) => {
  return Promise.map(battles, async battle => {
    const crowns = battle.team[0].crowns
    const opponentCrowns = battle.opponent[0].crowns
    const status =
      crowns > opponentCrowns
        ? 'win'
        : crowns === opponentCrowns
          ? 'draw'
          : 'lose'
    await BattleStatus.findOneAndUpdate(
      {
        player,
        battleType: battle.type,
        gameMode: battle.gameMode.name,
        status,
        crowns,
        opponentCrowns,
        at: Date(battle.battleTime),
      },
      {},
      { upsert: true }
    )
    return
  })
}

const getTopPlayers = async limit => {
  return (await request.get(
    `/locations/global/rankings/players?limit=${limit}`
  )).data
}

const normalizeTag = tag => tag.replace('#', '%23')

module.exports = {
  clantag,
  getMyClan,
  getMyClanMembers,
  getPlayer,
  getPlayerBattles,
  updateCardCount,
  saveBattles,
  getTopPlayers,
  normalizeTag,
}
