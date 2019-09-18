const {pool} = require('../config/mysql.js');

const express = require('express');
const cors = require('cors');
const {getDayString} = require('../utility');


const router = express.Router();

class TodosTemplates {

  static getAllTodosTemplates(req, res) {
    pool.execute(`SELECT * FROM TodosTemplates;`)
      .then(([rows, fields]) => {
        res.status(rows.length > 0 ? 200 : 404).send({res: rows});
      })
      .catch((err) => res.status(500).send({err: err.code}));
  }

  static getDayTodosTemplates(req, res) {
    pool.execute(`SELECT * FROM TodosTemplates WHERE ??;`,[req.params.day])
      .then(([rows, fields]) => {
        res.status(rows.length > 0 ? 200 : 404).send({res: rows});
      })
      .catch((err) => res.status(500).send({err: err.code}));
  }

  static getTodosTemplate(req, res) {
    pool.execute(`SELECT * FROM TodosTemplates WHERE id = ?;`,[req.params.id])
    .then(([rows, fields]) => {
      res.status(rows.length > 0 ? 200 : 404).send({res: rows});
    })
    .catch((err) => res.status(500).send({err: err.code}));
  }

  static insertTodosTemplate(req, res)  {
    const {monday, tuesday, wednesday, thursday, friday, saturday, message} = req.body;
    pool.execute(
      `INSERT INTO TodosTemplates
      (monday, tuesday, wednesday, thursday, friday, saturday, message)
      VALUES
      (?, ?, ?, ?, ?, ?, ?);`,
      [monday, tuesday, wednesday, thursday, friday, saturday, message])
      .then(([result, fields]) => {
        if (req.body[getDayString(new Date())]) {
          pool.execute(
            `INSERT INTO Todos (template, dayRef)
            SELECT ?, id FROM DailyTodos WHERE dateCreated=CURDATE();`,
            [result.insertId])
            .catch((err) => res.status(500).send({err: err.code}));
        }
        res.status(result.affectedRows > 0 ? 200 : 400).send({insertId: result.insertId});
      })
      .catch((err) => res.status(500).send({err: err.code}));
  }

  static updateTodosTemplate(req, res)  {
    const {monday, tuesday, wednesday, thursday, friday, saturday, message} = req.body;
    pool.execute(
      `UPDATE TodosTemplates SET
      monday=?, tuesday=?, wednesday=?, thursday=?, friday=?, saturday=?, message=?
      WHERE id=?;`,
      [monday, tuesday, wednesday, thursday, friday, saturday, message, req.params.id])
      .then(([result, fields]) => {
        res.status(result.affectedRows > 0 ? 204 : 400).send();
      })
      .catch((err) => res.status(500).send({err: err.code}));
  }

  static deleteTodosTemplate(req, res)  {
    pool.execute(
      `DELETE FROM TodosTemplates
      WHERE id = ?;`,
      [req.params.id])
      .then(([result, fields]) => {
        res.status(result.affectedRows > 0 ? 204 : 400).send();
      })
      .catch((err) => res.status(500).send({err: err.code}));
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
