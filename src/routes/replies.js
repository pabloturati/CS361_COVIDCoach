const router = require('express').Router()
const { ROUTES } = require('../constants')
const {
  findAllRepliesByPostId,
  createNewReply,
  increaseReplyLikes,
} = require('../shared/queries').replyQueries
const { createNowDate } = require('../shared/sharedFunctions')

router.get(ROUTES.replies, async (req, res) => {
  try {
    const replies = await findAllRepliesByPostId(req.query.postId)
    if (replies instanceof Error) throw replies
    res.send(replies)
  } catch (error) {
    console.error(error)
    res.send(error)
  }
})

router.post(ROUTES.replies, async (req, res) => {
  try {
    const { content, user_id: userId, parentPostId } = req.body
    const fetchResult = createNewReply({
      postId: parentPostId,
      userId,
      content,
      date: createNowDate(),
    })
    if (fetchResult instanceof Error) throw fetchResult
    res.send(fetchResult)
  } catch (error) {
    console.error(error)
    res.status(400)
    res.send(error)
  }
})

router.post(`${ROUTES.replies}/like`, async (req, res, next) => {
  const { replyId } = req.body
  if (replyId) {
    try {
      const result = await increaseReplyLikes(replyId)
      if (result instanceof Error) throw result
      res.status(200)
      res.send(result)
    } catch (error) {
      res.send(error)
    }
  } else {
    next()
  }
})

module.exports = router
