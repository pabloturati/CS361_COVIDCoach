const mysql = require('../constants/dbConfig')

const runQuery = async (query) => {
  try {
    const result = await new Promise((resolve, reject) => {
      mysql.pool.query(query, (err, result) => {
        err ? reject(err) : resolve(result)
      })
    })
    return result
  } catch (e) {
    return e
  }
}

module.exports = runQuery
