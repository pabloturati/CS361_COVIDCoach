const router = require('express').Router()
const path = require('path')

router.get('/forum', (req, res, next) => {
  // Serves react build
  res.sendFile(path.join(global.appRoot, '/forum-app/build/index.html'))
})

module.exports = router
