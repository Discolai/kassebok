const db = require('../db.js');
const mysql = require('mysql');

const express = require('express');
const cors = require('cors');

const router = express.Router();


class DailyTodos {
  static getDailyTodo(req, res) {
    console.log(req.params.date);
    db.query(
      `SELECT DT.message AS dailyMessage, T.id, T.completed, TT.message
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
    db.query(
      `INSERT INTO DailyTodos
      (day, message, dateCreated) VALUES (?, ?, ?);`,
      [req.body.day, req.body.message || "", req.body.dateCreated],
      (error, results, fields) => {
        if (error) {
          res.status(500).send({error: error.code});
        } else {
          db.query(
            `INSERT INTO Todos
            (dayRef, template)
            SELECT ?, id FROM TodosTemplates WHERE ??;`,
            [results.insertId, req.body.day],
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
