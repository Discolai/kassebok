const db = require('../db.js');

const sql = `
INSERT INTO giftcards VALUES
(?, ?, "2019-07-12", "Nikolai", NULL, NULL);
`;

db.query("DELETE FROM giftcards;", (error, results, fields) =>  {
  if (error) {
    console.log(results, error.code);
  }
});
for (var i = 0; i < 100; i++) {
  db.query(sql, [i, i], (error, results, fields) =>  {
    if (error) {
      console.log(results, error.code);
    }
  });
}
