const router = require('express').Router()
const { ROUTES } = require('../constants')
const { findAllRepliesByPostId } = require('../shared/queries').replyQueries

router.get(ROUTES.replies, async (req, res, next) => {
  try {
    const replies = await findAllRepliesByPostId(req.query.postId)
    if (replies instanceof Error) throw replies
    res.send(replies)
  } catch (error) {
    console.error(error)
    next()
  }
})

module.exports = router
