const db = require('../db.js');

const express = require('express');
const cors = require('cors');

const router = express.Router();

class TodosTemplates {

  static getAllTodosTemplates(req, res) {
    db.query(
      `SELECT * FROM TodosTemplates;`,
      (error, results, fields) => {
        if (error) {
          res.status(500).send({error: error.code});
        } else {
          res.status(results.length > 0 ? 200 : 404);
          res.send({res: results});
        }
      }
    );
  }

  static getDayTodosTemplates(req, res) {
    db.query(
      `SELECT * FROM TodosTemplates WHERE ??;`,
      [req.params.day],
      (error, results, fields) => {
        if (error) {
          res.status(500).send({error: error.code});
        } else {
          res.status(results.length > 0 ? 200 : 404);
          res.send({res: results});
        }
      }
    );
  }

  static getTodosTemplate(req, res) {
    db.query(
      `SELECT * FROM TodosTemplates
      WHERE id = ?;`,
      [req.params.id],
      (error, results, fields) => {
        if (error) {
          res.status(500).send({error: error.code});
        } else {
          res.status(results.length > 0 ? 200 : 404);
          res.send({res: results});
        }
      }
    );
  }

  static insertTodosTemplate(req, res)  {
    const {monday, tuesday, wednesday, thursday, friday, saturday, message} = req.body;

    db.query(
      `INSERT INTO TodosTemplates
      (monday, tuesday, wednesday, thursday, friday, saturday, message)
      VALUES
      (?, ?, ?, ?, ?, ?, ?);`,
      [monday, tuesday, wednesday, thursday, friday, saturday, message],
      (error1, results1, fields1) =>  {
        if (error1) {
          res.status(500).send({error: error1.code});
        } else {
          const day = new Date().getDay();
          const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

          // Add the todo to todays todos
          if (req.body[days[day]]) {
            db.query(
              `INSERT INTO Todos (template, dayRef)
              SELECT ?, id FROM DailyTodos WHERE dateCreated=CURDATE();`,
              [results1.insertId],
              (error2, results2, fields2) =>  {
              }
            );
          }


          res.status(results1.affectedRows > 0 ? 200 : 400);
          res.send({insertId: results1.insertId});
        }
      }
    );
  }

  static updateTodosTemplate(req, res)  {
    const {monday, tuesday, wednesday, thursday, friday, saturday, message} = req.body;

    db.query(
      `UPDATE TodosTemplates SET
      monday=?, tuesday=?, wednesday=?, thursday=?, friday=?, saturday=?, message=?
      WHERE id=?;`,
      [monday, tuesday, wednesday, thursday, friday, saturday, message, req.params.id],
      (error, results, fields) =>  {
        if (error) {
          res.status(500).send({error: error.code});
        } else {
          res.status(results.affectedRows > 0 ? 204 : 400);
          res.send();
        }
      }
    );
  }

  static deleteTodosTemplate(req, res)  {
    db.query(
      `DELETE FROM TodosTemplates
      WHERE id = ?;`,
      [req.params.id],
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
router.options('/:id', cors());
router.options('/day/:day', cors());

router.get('/', cors(), TodosTemplates.getAllTodosTemplates);
router.get('/:id', cors(), TodosTemplates.getTodosTemplate);
router.get('/day/:day', cors(), TodosTemplates.getDayTodosTemplates);

router.post('/', cors(), TodosTemplates.insertTodosTemplate);

router.put('/:id', cors(), TodosTemplates.updateTodosTemplate);

router.delete('/:id', cors(), TodosTemplates.deleteTodosTemplate);

module.exports = router;
