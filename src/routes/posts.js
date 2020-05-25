const router = require('express').Router()
const { ROUTES } = require('../constants')
const { findAllPostsByTopicId } = require('../shared/queries').postsQueries

router.get(ROUTES.posts, async (req, res, next) => {
  try {
    const posts = await findAllPostsByTopicId(req.query.topicId)
    if (posts instanceof Error) throw posts
    res.send(posts)
  } catch (error) {
    console.error(posts)
    next()
  }
})

module.exports = router
