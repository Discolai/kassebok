const mysql = require('mysql');

const dbPool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'kassebok',
  dateStrings: true
});

module.exports = dbPool;
