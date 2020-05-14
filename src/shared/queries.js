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
module.exports = { authQueries }
