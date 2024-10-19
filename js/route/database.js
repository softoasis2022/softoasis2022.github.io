const db = require('mysql')
 const conn = db.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'user',
  password: 'user',
  database: 'user'
 })
 module.exports = conn
