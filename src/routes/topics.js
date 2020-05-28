const router = require('express').Router()
const { ROUTES } = require('../constants')
const { findAllTopics } = require('../shared/queries').topicsQueries

router.get(ROUTES.topics, async (req, res, next) => {
  try {
    const topics = await findAllTopics()
    if (topics instanceof Error) throw topics
    res.send(topics)
  } catch (error) {
    console.error(result)
    next()
  }
})

module.exports = router
