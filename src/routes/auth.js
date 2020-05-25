const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const google = require('googleapis').google

const OAuth2 = google.auth.OAuth2
const CONFIG = require('../constants/authConfig.js')
const ROUTES = require('../constants').ROUTES
const { authQueries } = require('../shared/queries')

const { home, login, createSession, sessionResult } = ROUTES
const { findUserByEmail, createUserEntry, userDataById } = authQueries

const signup = async (userProfile) => {
  const {
    email,
    given_name: firstName,
    family_name: lastName,
    picture: profileImg,
  } = userProfile

  const usersWithSameEmail = await findUserByEmail(userProfile.email)
  if (usersWithSameEmail.length > 0) return null

  const userId = await createUserEntry(
    email,
    firstName,
    lastName,
    profileImg,
    'pending token'
  )
  return userId
}

// Creates an OAuth2 client object from the credentials in our config file
const createOauth2Client = () =>
  new OAuth2(
    CONFIG.oauth2Credentials.client_id,
    CONFIG.oauth2Credentials.client_secret,
    CONFIG.oauth2Credentials.redirect_uris[0]
  )

router.get(login, (req, res) => {
  const oauth2Client = createOauth2Client()

  // Obtain the google login link
  const loginLink = oauth2Client.generateAuthUrl({
    access_type: 'offline', // Indicates that we need to be able to access data continously without the user constantly giving us consent
    scope: CONFIG.oauth2Credentials.scopes, // Using the access scopes from our config file
  })
  return res.render('login', { loginLink: loginLink })
})

router.get(createSession, (req, res) => {
  const oauth2Client = createOauth2Client()
  if (req.query.error) {
    // The user did not give us permission.
    return res.redirect(home)
  } else {
    oauth2Client.getToken(req.query.code, function (err, token) {
      if (err) return res.redirect(home)
      // Store the credentials given by google into a jsonwebtoken in a cookie called 'jwt'
      res.cookie('jwt', jwt.sign(token, CONFIG.JWTsecret))
      return res.redirect(sessionResult)
    })
  }
})

router.get(sessionResult, async (req, res, next) => {
  if (!req.cookies.jwt) {
    // We haven't logged in
    return res.redirect(home)
  }
  // Create an OAuth2 client object from the credentials in our config file
  const oauth2Client = new OAuth2(
    CONFIG.oauth2Credentials.client_id,
    CONFIG.oauth2Credentials.client_secret,
    CONFIG.oauth2Credentials.redirect_uris[0]
  )

  // Add this specific user's credentials to our OAuth2 client
  const credentials = jwt.verify(req.cookies.jwt, CONFIG.JWTsecret)
  oauth2Client.setCredentials(credentials)

  const oauth2 = google.oauth2({
    auth: oauth2Client,
    version: 'v2',
  })

  try {
    const profile = await oauth2.userinfo.get()
    const result = await signup(profile.data)
    if (result) {
      const userId = result.insertId
      req.session.userId = userId //Create session
      const { cookie } = req.session
      const user = await userDataById(userId)
      res.send({ ...user[0], expires: cookie.expires })
    }
    res.send(profile.data)
  } catch (err) {
    next()
  }
})

module.exports = router
