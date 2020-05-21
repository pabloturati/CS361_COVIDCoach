require('dotenv').config()
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const express = require('express')
const path = require('path')
const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session)
const mysql = require('./constants/dbConfig')
const constants = require('./constants')

const app = express()

// Middleware Setup
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// View engine config
require('hbs')
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

// Path to public and static setup
const joinPath = (customPath) => path.join(__dirname, customPath)
app.use(express.static(joinPath('../forum-app/build'), { index: false }))
app.use(express.static(joinPath('../public'), { index: false }))
global.appRoot = path.resolve(__dirname, '../')

// Session config
const { SESSION_NAME, SESSION_DURATION, SESSION_SECRET } = process.env
const sessionStore = new MySQLStore(
  {
    expiration: constants.SESSION_EXPIRATION, //3h
    createDatabaseTable: true,
    schema: {
      tableName: 'Sessions',
      columnNames: {
        session_id: 'session_id',
        expires: 'expires',
        data: 'data',
      },
    },
  },
  mysql.pool
)
app.use(
  session({
    cookie: {
      maxAge: parseInt(SESSION_DURATION),
      sameSite: 'strict',
    },
    name: SESSION_NAME,
    resave: false,
    saveUninitialized: false, //Verify
    store: sessionStore,
    secret: SESSION_SECRET,
  })
)

// Route Config
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
