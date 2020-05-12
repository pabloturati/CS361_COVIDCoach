require('dotenv').config()
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const express = require('express')
const path = require('path')
const google = require('googleapis').google

const OAuth2 = google.auth.OAuth2
const CONFIG = require('./config')

const app = express()

// Middleware Setup
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, '../public')))

app.get('/', (req, res) => {
  res.send('Hello COVIDCoach')
})

const auth = require('./routes/auth')
app.use('/', auth)

// Run using node src/app.js
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})

//Heroku notes:
// When working off a branch, push via git push heroku your-branch-name:master
// Heroku URL: https://covid-coach.herokuapp.com/
