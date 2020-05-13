require('dotenv').config()
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const express = require('express')
const path = require('path')
const app = express()

// Middleware Setup
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

require('hbs')

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, '../public')))

const auth = require('./routes/auth')
const news = require('./routes/news')
const forum = require('./routes/forum')
const safety = require('./routes/safety')

app.use('/', news)
app.use('/', auth)
app.use('/', forum)
app.use('/', safety)

// Run using node src/app.js
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})

//Heroku notes:
// When working off a branch, push via git push heroku your-branch-name:master
// Heroku URL: https://covid-coach.herokuapp.com/
