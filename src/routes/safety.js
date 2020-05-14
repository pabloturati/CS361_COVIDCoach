const router = require('express').Router()

router.get('/safety', (req, res, next) => {
  res.render('safety')
})
module.exports = router
