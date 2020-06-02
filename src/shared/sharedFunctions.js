const moment = require('moment')

const createNowDate = () => moment().format('MM-DD-YYYY hh:mm:ss A')

module.exports = { createNowDate }
