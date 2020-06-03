const axios = require('axios')
const router = require('express').Router()

router.get('/', (req, res) => {
  res.redirect('/index')
})
router.get('/index', async (req, res) => {
  const news = await axios.get(
    `https://newsapi.org/v2/everything?q=COVID&apiKey=${process.env.NEWS_API_KEY}`
  )
  if (news instanceof Error) res.send('Error fetching news')
  res.render('news', {
    title: 'Covid News',
    news: news.data.articles,
    test: 'pablo',
  })
})

module.exports = router
