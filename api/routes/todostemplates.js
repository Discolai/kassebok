const db = require('../db.js');

const express = require('express');
const cors = require('cors');

const router = express.Router();

class TodosTemplates {

  static getTodosTemplates(req, res) {
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
      (error, results, fields) =>  {
        if (error) {
          res.status(500).send({error: error.code});
        } else {
          res.status(results.affectedRows > 0 ? 200 : 400);
          res.send({insertId: results.insertId});
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

router.get('/', cors(), TodosTemplates.getTodosTemplates);
router.get('/:id', cors(), TodosTemplates.getTodosTemplate);

router.post('/', cors(), TodosTemplates.insertTodosTemplate);

router.put('/:id', cors(), TodosTemplates.updateTodosTemplate);

router.delete('/:id', cors(), TodosTemplates.deleteTodosTemplate);

module.exports = router;
