const router = require('express').Router()

const { ROUTES } = require('../constants')
const {
  findAllPostsByTopicId,
  createNewPost,
  linkPostToTopic,
  increasePostLikes,
} = require('../shared/queries').postsQueries

const { createNowDate } = require('../shared/sharedFunctions')

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

router.post(`${ROUTES.posts}/like`, async (req, res, next) => {
  const { postId } = req.body
  if (postId) {
    try {
      const result = await increasePostLikes(postId)
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

router.post(ROUTES.posts, async (req, res, next) => {
  try {
    const { title, content, topic_id: topicId, user_id: userId } = req.body
    const createPostResult = await createNewPost({
      date: createNowDate(),
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
