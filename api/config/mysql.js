const mysql = require('mysql2');
const mysqlPromise = require('mysql2/promise');

const dbPool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'kassebok',
  dateStrings: true
});
const pool = mysqlPromise.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'kassebok',
  dateStrings: true,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = {dbPool, pool};
