const mysqlPromise = require('mysql2/promise');

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

module.exports = {pool};
