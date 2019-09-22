const {pool} = require('../config/mysql.js');
const passport = require('passport');
const express = require('express');
const cors = require('cors');

const router = express.Router();

const {getDayString} = require('../utility');

class DailyTodos {
  static getDailyTodo(req, res) {
    pool.execute(
      `SELECT DT.message AS dailyMessage, T.id, TT.id AS templateId, T.completed, TT.message
      FROM DailyTodos AS DT
      JOIN Todos AS T ON DT.id = T.dayRef
      JOIN TodosTemplates AS TT ON T.template = TT.id
      WHERE DT.dateCreated = ?;`,
      [req.params.date])
      .then(([rows, fields]) => {
        res.status(rows.length > 0 ? 200 : 404);
        res.send(
          {
            dailyMessage: rows[0] ? rows[0].dailyMessage : "",
            res: rows
          });
      })
      .catch((err) => res.status(500).send({err: err.code}));
  }

  static insertDailyTodo(req, res)  {
    const {message} = req.body;
    const dateCreated = req.params.date;
    const dateObj = new Date(dateCreated);

    // Sunday
    if (dateObj.getDay() === 0) {
      res.status(400).send({err: "Sunday is not applicable!"});
    } else {
      // Array of applicable days
      const days = [0, 0, 0, 0, 0, 0];
      days[dateObj.getDay() - 1] = 1;

      pool.execute(
        `INSERT INTO DailyTodos
        (monday, tuesday, wednesday, thursday, friday, saturday, dateCreated, message)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
        [...days, dateCreated, message || ""])
        .then(([result, fields]) => {
          pool.execute(
            `INSERT INTO Todos
            (dayRef, template)
            SELECT ?, id FROM TodosTemplates WHERE
            monday=? OR tuesday=? OR wednesday=?
            OR thursday=? OR friday=? OR saturday=?;`,
            [result.insertId, ...days])
            .then(() => {
              res.status(result.affectedRows > 0 ? 200 : 400).send({insertId: result.insertId});
            })
            .catch((err) => res.status(500).send({err: err}));
          })
          .catch((err) => res.status(500).send({err: err}));
    }
  }

  static updateDailyTodo(req, res)  {
    pool.execute(
      `UPDATE DailyTodos
      SET message=?
      WHERE dateCreated=?;`,
      [req.body.message, req.params.date])
      .then(([result, fields]) => {
        res.status(result.affectedRows > 0 ? 204 : 400).send();
      })
      .catch((err) => res.status(500).send({err: err}));
  }

  static deleteDailyTodo(req, res)  {
    pool.execute(
      `DELETE FROM DailyTodos
      WHERE dateCreated=?;`,
      [req.params.date])
      .then(([result, fields]) => {
        res.status(result.affectedRows > 0 ? 204 : 404).send();
      })
      .catch((err) => res.status(500).send({err: err}));
  }
}

router.get('/:date', passport.authenticate('jwt', {session: false}), DailyTodos.getDailyTodo);

router.post('/:date', passport.authenticate('jwt', {session: false}), DailyTodos.insertDailyTodo);

router.put('/:date', passport.authenticate('jwt', {session: false}), DailyTodos.updateDailyTodo);

router.delete('/:date', passport.authenticate('jwt', {session: false}), DailyTodos.deleteDailyTodo);


module.exports = router;
