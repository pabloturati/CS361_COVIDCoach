const runQuery = require('./runQuery')
const authQueries = {
  createUserEntry: (email, firstName, lastName, profileImg, googletoken) =>
    runQuery(
      `
        INSERT INTO Users(email, first_name, last_name, profile_image, google_auth_token) 
        VALUES ('${email}', '${firstName}', '${lastName}', '${profileImg}', '${googletoken}');`
    ),
  findUserByEmail: (email) =>
    runQuery(`SELECT * FROM Users WHERE email='${email}';`),
  verifyCredentials: (email, password) =>
    runQuery(
      `SELECT user_id FROM Users WHERE email='${email}' AND password='${password}';`
    ),
  userDataById: (id) =>
    runQuery(
      `SELECT user_id, email, first_name, last_name, profile_image FROM Users WHERE user_id=${id};`
    ),
}

const topicsQueries = {
  findAllTopics: () => runQuery('SELECT * FROM Topics;'),
}

const postsQueries = {
  findAllPostsByTopicId: (topicId) =>
    runQuery(
      `SELECT P.post_id, date_published, num_of_likes, P.title AS post_title, content, CONCAT_WS(" ", first_name, last_name) 
      AS author, U.profile_image, T.title, T.topic_id AS topic FROM Posts P 
      INNER JOIN Users U ON P.user_id=U.user_id
      INNER JOIN topics_posts TP ON P.post_id=TP.post_id
      INNER JOIN Topics T ON T.topic_id=TP.topic_id
      WHERE T.topic_id=${topicId};`
    ),
}

const replyQueries = {
  findAllRepliesByPostId: (postId) =>
    runQuery(`SELECT response_id, date_published, num_of_likes, content, CONCAT_WS(" ", first_name, last_name) AS author, profile_image FROM Responses R 
    INNER JOIN Users U ON R.user_id = U.user_id WHERE post_id=${postId};`),
}
module.exports = { authQueries, topicsQueries, postsQueries, replyQueries }
