const router = require('express').Router()
const { ROUTES } = require('../constants')
const {
  findAllRepliesByPostId,
  createNewReply,
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

module.exports = router
