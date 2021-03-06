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
      WHERE T.topic_id=${topicId}
      ORDER BY date_published DESC;
      ;`
    ),

  createNewPost: ({ date, title, content, userId }) =>
    runQuery(
      `INSERT INTO Posts (user_id, date_published, num_of_likes, title, content) VALUES 
      (${userId}, STR_TO_DATE("${date}", '%m-%d-%Y %r'), 0, "${title}", "${content}");`
    ),
  linkPostToTopic: ({ postId, topicId }) =>
    runQuery(
      `INSERT INTO topics_posts (topic_id, post_id) VALUES (${topicId}, "${postId}");`
    ),
  increasePostLikes: (postId) =>
    runQuery(
      `UPDATE Posts SET num_of_likes = num_of_likes + 1 WHERE post_id=${postId};`
    ),
}

const replyQueries = {
  findAllRepliesByPostId: (postId) =>
    runQuery(`SELECT response_id, date_published, num_of_likes, content, CONCAT_WS(" ", first_name, last_name) AS author, profile_image FROM Responses R 
    INNER JOIN Users U ON R.user_id = U.user_id WHERE post_id=${postId}
    ORDER BY date_published DESC;`),

  createNewReply: ({ postId, userId, date, content }) =>
    runQuery(`INSERT INTO Responses (post_id, user_id, date_published, num_of_likes, content) VALUES 
  (${postId}, ${userId}, STR_TO_DATE("${date}", '%m-%d-%Y %r'), 0, "${content}");`),
  increaseReplyLikes: (replytId) =>
    runQuery(
      `UPDATE Responses SET num_of_likes = num_of_likes + 1 WHERE response_id=${replytId};`
    ),
}
module.exports = { authQueries, topicsQueries, postsQueries, replyQueries }
