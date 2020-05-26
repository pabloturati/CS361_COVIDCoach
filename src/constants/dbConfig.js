const mysql = require('mysql')
const {
  DB_HOST,
  DB_USERNAME,
  DB_NAME,
  DB_PASSWORD,
  LOCAL_DB_HOST,
  LOCAL_DB_USERNAME,
  LOCAL_DB_NAME,
  LOCAL_DB_PASSWORD,
  RUN_LOCAL,
} = process.env

const pool = mysql.createPool({
  connectionLimit: 10,
  host: RUN_LOCAL ? LOCAL_DB_HOST : DB_HOST,
  user: RUN_LOCAL ? LOCAL_DB_USERNAME : DB_USERNAME,
  password: RUN_LOCAL ? LOCAL_DB_PASSWORD : DB_PASSWORD,
  database: RUN_LOCAL ? LOCAL_DB_NAME : DB_NAME,
})

module.exports.pool = pool
