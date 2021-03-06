const fetchData = require('./fetcher')
const createCards = require('./createCards')

async function init() {
  await createCards()
  return 0
}

const doFetch = async () => {
  // eslint-disable-next-line no-console
  console.log('running!')
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
  // eslint-disable-next-line no-console
  console.log('done!')
  return
}

module.exports = doFetch
