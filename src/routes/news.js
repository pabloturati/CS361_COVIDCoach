const router = require('express').Router()

router.get('/', (req, res) => {
  res.redirect('/index')
})
router.get('/index', (req, res) => {
  res.render('news', { title: 'Covid News' })
})

module.exports = router
