// const loop_module = require('pheebs_loop_module')
const fetchData = require('./lib/fetcher')
const createCards = require('./lib/createCards')

async function init() {
  await createCards()
  return
}

async function run() {
  try {
    await init()
    await fetchData()
  } catch (err) {
    /* eslint-disable no-console */
    console.log('ERROR: ', err.message)
    err.response && console.log('REASON: ', err.response.data.reason)
    err.response && console.log('MESSAGE: ', err.response.data.message)
    /* eslint-disable no-console */
  }
  return
}

run()
