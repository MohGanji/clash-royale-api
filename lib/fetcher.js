const Promise = require('bluebird')
const request = require('./request')
const mongo = require('./mongo')

const Clan = mongo.model('Clan')
const Member = mongo.model('Member')
const Player = mongo.model('Player')
const PlayerDeck = mongo.model('PlayerDeck')
const Card = mongo.model('Card')
const BattleStatus = mongo.model('BattleStatus')

const clantag = '%238QQGQ9R0'

const nomalizeTag = tag => tag.replace('#', '%23')

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

const updateClanCardCounts = async player => {
  return Promise.map(player.currentDeck, async card =>
    Card.findOneAndUpdate({ name: card.name }, { $inc: { clanCount: 1 } })
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

async function fetcher() {
  const clan = await getMyClan()
  await Clan.create({ ...clan })

  const { items: clanPlayers } = await getMyClanMembers()
  await Promise.map(clanPlayers, async member => {
    await Member.create({ ...member })

    const player = await getPlayer(nomalizeTag(member.tag))
    const { _id: playerId } = await Player.create({ ...player })

    await PlayerDeck.create({ player: playerId, deck: player.cards })
    await updateClanCardCounts(player)
    const battles = await getPlayerBattles(nomalizeTag(member.tag))
    await saveBattles(playerId, battles)
    console.log(`player: ${player.name}`)
    return
  })

  return
}

module.exports = fetcher
