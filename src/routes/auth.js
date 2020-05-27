const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const google = require('googleapis').google
const axios = require('axios')

const OAuth2 = google.auth.OAuth2
const CONFIG = require('../constants/authConfig.js')
const ROUTES = require('../constants').ROUTES
const { authQueries } = require('../shared/queries')

const { login, autorizeUser } = ROUTES
const { findUserByEmail, createUserEntry, userDataById } = authQueries

//Searches for user by email in DB. If found returns userId.
//If not found creates the user entry and returns new userId.
const findOrSignupUser = async (profileData) => {
  const {
    email,
    given_name: firstName,
    family_name: lastName,
    picture: profileImg,
    tokenId,
  } = profileData

  try {
    const existingUser = await findUserByEmail(profileData.email)
    if (existingUser instanceof Error) throw existingUser

    if (existingUser.length > 0) return { ...existingUser[0] }
    else {
      const createUserResponse = await createUserEntry(
        email,
        firstName,
        lastName,
        profileImg,
        tokenId
      )
      if (createUserResponse instanceof Error) throw createUserResponse
      const newUserData = await userDataById(createUserResponse.insertId)
      return { ...newUserData[0] }
    }
  } catch (error) {
    return null
  }
}

// Obtain the google login link
router.get(login, (req, res) => {
  const oauth2Client = new OAuth2(
    CONFIG.oauth2Credentials.client_id,
    CONFIG.oauth2Credentials.client_secret,
    CONFIG.oauth2Credentials.redirect_uris[0]
  )
  try {
    const loginLink = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: CONFIG.oauth2Credentials.scopes,
    })
    res.send(loginLink)
  } catch (error) {
    res.status(503)
    res.send(error)
  }
})

// Obtain the google login link
router.post(autorizeUser, async (req, res, next) => {
  const { tokenId } = req.body
  try {
    const url = `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${tokenId}`
    const { data: userData } = await axios.get(url)

    const dbUserData = await findOrSignupUser({ tokenId, ...userData })

    if (dbUserData) {
      req.session.userId = dbUserData.userId //Create session
    }
    const { cookie } = req.session
    res.send({ ...userData, expires: cookie.expires })
  } catch (error) {
    res.status(401)
    res.send(error)
  }
})

module.exports = router
