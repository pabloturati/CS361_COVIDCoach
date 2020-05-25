const router = require('express').Router()
const { ROUTES } = require('../constants')
const { findAllTopics } = require('../shared/queries').topicsQueries

router.get(ROUTES.topics, async (req, res, next) => {
  const topics = await findAllTopics()
  if (topics instanceof Error) {
    console.error(result)
    next()
  } else {
    res.send(topics)
  }
})

module.exports = router
