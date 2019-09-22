const {pool} = require('../config/mysql.js');
const passport = require('passport');
const express = require('express');
const cors = require('cors');

const router = express.Router();

class Todos {
  static updateTodo(req, res)  {
    pool.execute(
      `UPDATE Todos
      SET completed = ?
      WHERE id = ?;`,
      [req.body.completed, req.params.id])
      .then(([result, fields]) => {
        res.status(result.affectedRows > 0 ? 204 : 400).send();
      })
      .catch((err) => res.status(500).send({err: err.code}));
  }
}

router.put('/:id', passport.authenticate('jwt', {session: false}), Todos.updateTodo);

module.exports = router;
