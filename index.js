const doFetch = require('./lib/doFetch')
const HOUR = 1000 * 60 * 60

setInterval(doFetch, 24 * HOUR)
// doFetch()
