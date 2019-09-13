const db = require('../db.js');
const mysql = require('mysql');

const express = require('express');
const cors = require('cors');

const router = express.Router();

function getDayString(date)  {
  switch (new Date(date).getDay()) {
    case 0:
      return 'sunday';
    case 1:
      return 'monday';
    case 2:
      return 'tuesday';
    case 3:
      return 'wednesday';
    case 4:
      return 'thursday';
    case 5:
      return 'friday';
    case 6:
      return 'saturday';
    default:
      return '';
  }
}


class DailyTodos {
  static getDailyTodo(req, res) {
    console.log(req.params.date);
    db.query(
      `SELECT DT.message AS dailyMessage, T.id, TT.id AS templateId, T.completed, TT.message
      FROM DailyTodos AS DT
      JOIN Todos AS T ON DT.id = T.dayRef
      JOIN TodosTemplates AS TT ON T.template = TT.id
      WHERE DT.dateCreated = ?;`,
      [req.params.date],
      (error, results, fields) => {
        if (error) {
          res.status(500).send({error: error.code});
        } else {
          res.status(results.length > 0 ? 200 : 404);
          res.send(
            {
              dailyMessage: results[0] ? results[0].dailyMessage : "",
              res: results
            });
        }
      }
    );
  }

  static insertDailyTodo(req, res)  {
    const {dateCreated, message} = req.body;
    const day = getDayString(dateCreated);
    db.query(
      `INSERT INTO DailyTodos
      (day, dateCreated, message) VALUES (?, ?, ?);`,
      [day, dateCreated, message || ""],
      (error, results, fields) => {
        if (error) {
          res.status(500).send({error: error.code});
        } else {
          db.query(
            `INSERT INTO Todos
            (dayRef, template)
            SELECT ?, id FROM TodosTemplates WHERE ??;`,
            [results.insertId, day],
            (error2, results2, fields2) => {
              if (error) {
                res.status(500).send({error: error2.code});
              } else {
                res.status(results2.affectedRows > 0 ? 200 : 400)
                .send({insertId: results.insertId});
              }
            }
          )
        }
      }
    );
  }

  static updateDailyTodo(req, res)  {
    db.query(
      `UPDATE DailyTodos
      SET message=?
      WHERE dateCreated=?;`,
      [req.body.message, req.params.date],
      (error, results, fields) => {
        if (error) {
          res.status(500).send({error: error.code});
        } else {
          res.status(results.affectedRows > 0 ? 204 : 404);
          res.send();
        }
      }
    );
  }

  static deleteDailyTodo(req, res)  {
    db.query(
      `DELETE FROM DailyTodos
      WHERE dateCreated=?;`,
      [req.params.date],
      (error, results, fields) => {
        if (error) {
          res.status(500).send({error: error.code});
        } else {
          res.status(results.affectedRows > 0 ? 204 : 404);
          res.send();
        }
      }
    );
  }
}


router.options('/', cors());
router.options('/:date', cors());

router.get('/:date', cors(), DailyTodos.getDailyTodo);

router.post('/', cors(), DailyTodos.insertDailyTodo);

router.put('/:date', cors(), DailyTodos.updateDailyTodo);

router.delete('/:date', cors(), DailyTodos.deleteDailyTodo);


module.exports = router;
