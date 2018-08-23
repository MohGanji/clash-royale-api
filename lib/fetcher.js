const Promise = require('bluebird')
const request = require('./request')
const mongo = require('./mongo')

const Clan = mongo.model('Clan')
const Member = mongo.model('Member')
const Player = mongo.model('Player')
const PlayerDeck = mongo.model('PlayerDeck')
const Card = mongo.model('Card')

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

const updateClanCardCounts = async player => {
  return Promise.map(player.cards, async card => {
    await Card.findOneAndUpdate({ name: card.name }, { $inc: { clanCount: 1 } })
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
    await updateClanCardCounts()

    // TODO: get each players battles and their status, and add to DB.

    return
  })

  return
}

module.exports = fetcher
