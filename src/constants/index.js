const SESSION_EXPIRATION = 10800000
const ROUTES = {
  home: '/',
  login: '/login',
  createSession: '/auth_callback',
  sessionResult: '/session-result',
}

module.exports = { SESSION_EXPIRATION, ROUTES }
