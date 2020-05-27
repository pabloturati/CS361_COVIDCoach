const SESSION_EXPIRATION = 10800000
const PAGE_ROUTES = {
  news: '/index',
  safety: '/safety',
  forum: '/forum',
}
const ROUTES = {
  home: '/',
  login: '/login',
  topics: '/topics',
  posts: '/posts',
  replies: '/replies',
  autorizeUser: '/authorize-user',
}

module.exports = { SESSION_EXPIRATION, ROUTES, PAGE_ROUTES }
