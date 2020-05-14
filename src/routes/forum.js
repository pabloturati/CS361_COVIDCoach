const router = require('express').Router()

router.get('/forum', (req, res, next) => {
  res.render('forum', {})
})

module.exports = router
