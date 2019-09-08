const db = require('../db.js');
const mysql = require('mysql');

const express = require('express');
const cors = require('cors');

const router = express.Router();


class Todos {
  static getDailyTodos(req, res) {
    db.query(
      `SELECT T.id, T.completed, TT.message
      FROM DailyTodos AS DT
      JOIN Todos AS T ON DT.id = T.dayRef
      JOIN TodosTemplates AS TT ON T.template = TT.id
      WHERE DT.dateCreated = ?;`,
      [req.body.dateCreated],
      (error, results, fields) => {
        if (error) {
          res.status(500).send({error: error.code});
        } else {
          res.status(results.length > 0 ? 200 : 404);
          res.send({res: results});
        }
    });
  }

  static insertDailyTodo(req, res)  {
    db.query(
      `INSERT INTO DailyTodos
      (day, message, dateCreated) VALUES (?, ?, CURRENT_DATE());`,
      [req.body.day, req.body.message || null],
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
    });
  }

  static updateTodo(req, res)  {
    db.query(
      `UPDATE Todos
      SET completed = ?
      WHERE id = ?;`,
      [req.body.completed, req.params.id],
      (error, results, fields) => {
        if (error) {
          res.status(500).send({error: error.code});
        } else {
          res.status(results.affectedRows > 0 ? 204 : 400).send();
        }
      }
    )
  }
}


router.options('/', cors());
router.options('/:id', cors());

router.get('/', cors(), Todos.getDailyTodos);

router.post('/', cors(), Todos.insertDailyTodo);

router.put('/:id', cors(), Todos.updateTodo);


module.exports = router;
