const db = require('../db.js');
const mysql = require('mysql');

const express = require('express');
const cors = require('cors');

const router = express.Router();

class Todos {
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
    );
  }
}

router.options('/', cors());
router.options('/:id', cors());

router.put('/:id', cors(), Todos.updateTodo);

module.exports = router;
