const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const google = require('googleapis').google

const OAuth2 = google.auth.OAuth2
const CONFIG = require('../constants/authConfig.js')

const createOauth2Client = () =>
  new OAuth2(
    CONFIG.oauth2Credentials.client_id,
    CONFIG.oauth2Credentials.client_secret,
    CONFIG.oauth2Credentials.redirect_uris[0]
  )

router.get('/login', (req, res) => {
  const oauth2Client = createOauth2Client()

  // Obtain the google login link
  const loginLink = oauth2Client.generateAuthUrl({
    access_type: 'offline', // Indicates that we need to be able to access data continously without the user constantly giving us consent
    scope: CONFIG.oauth2Credentials.scopes, // Using the access scopes from our config file
  })

  return res.render('login', { loginLink: loginLink })
})

router.get('/auth_callback', (req, res) => {
  // Create an OAuth2 client object from the credentials in our config file
  const oauth2Client = createOauth2Client()
  if (req.query.error) {
    // The user did not give us permission.
    return res.redirect('/')
  } else {
    oauth2Client.getToken(req.query.code, function (err, token) {
      if (err) return res.redirect('/')
      // Store the credentials given by google into a jsonwebtoken in a cookie called 'jwt'
      res.cookie('jwt', jwt.sign(token, CONFIG.JWTsecret))
      return res.redirect('/get_some_data')
    })
  }
})

router.get('/get_some_data', async (req, res, next) => {
  if (!req.cookies.jwt) {
    // We haven't logged in
    return res.redirect('/')
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
    console.log(profile)
    res.send(profile.data)
  } catch (err) {
    console.log(err)
    next()
  }
})

module.exports = router
