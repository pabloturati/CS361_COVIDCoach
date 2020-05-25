const router = require('express').Router()
const { ROUTES } = require('../constants')
const { findAllPostsByTopicId } = require('../shared/queries').postsQueries

router.get(ROUTES.posts, async (req, res, next) => {
  const { topicId } = req.query
  const posts = await findAllPostsByTopicId(topicId)
  if (posts instanceof Error) {
    console.error(posts)
    next()
  } else {
    res.send(posts)
  }
})

module.exports = router
