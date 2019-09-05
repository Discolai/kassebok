const mysql = require('mysql');

const dbPool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'kassebok',
  password: 'p0svU#7G8Nq3',
  database: 'kassebok',
  dateStrings: true
});

module.exports = dbPool;
