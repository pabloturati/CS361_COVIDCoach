const router = require('express').Router()
const moment = require('moment')

const { ROUTES } = require('../constants')
const {
  findAllPostsByTopicId,
  createNewPost,
  linkPostToTopic,
} = require('../shared/queries').postsQueries

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

router.post(ROUTES.posts, async (req, res, next) => {
  try {
    const { title, content, topic_id: topicId, user_id: userId } = req.body
    const date = moment().format('MM-DD-YYYY hh:mm:ss A')
    const createPostResult = await createNewPost({
      date,
      title,
      content,
      userId,
    })
    if (createPostResult instanceof Error) throw createPostResult
    const newPostId = createPostResult.insertId
    const linkResult = await linkPostToTopic({
      postId: newPostId,
      topicId,
    })
    if (linkResult instanceof Error) throw linkResult
    res.status(200)
    res.send({ newPostId })
  } catch (error) {
    console.error(error)
    res.status(500)
    res.send(error)
  }
})

module.exports = router
