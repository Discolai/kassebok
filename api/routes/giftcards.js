const {pool} = require('../config/mysql.js');
const passport = require('passport');
const express = require('express');
const cors = require('cors');

const router = express.Router();

class Giftcard {
  static insertGiftcard(req, res) {
    const { cardId, value, soldOn, soldBy, receivedOn, receivedBy} = req.body;
    pool.execute(
      `INSERT INTO GiftCards
      (cardId, value, soldOn, soldBy, receivedOn, receivedBy)
      VALUES (?, ?, ?, ?, ?, ?);`,
      [cardId, value, soldOn, soldBy, receivedOn || null, receivedBy || null])
      .then(([result, fields]) => {
        res.status(result.affectedRows > 0 ? 200 : 400).send({insertId: result.insertId});
      })
      .catch((err) => res.status(400).send({errno: err.errno}));
  }

  static getAllGiftcards(req, res) {
    pool.execute(`SELECT * FROM GiftCards ORDER BY cardId;`)
      .then(([rows, fields]) => {
        res.status(rows.length > 0 ? 200 : 404).send({res: rows});
      })
      .catch((err) => res.status(400).send({errno: err.errno}));
  }

  static getSingleGiftcard(req, res)  {
    pool.execute(
      `SELECT * FROM GiftCards WHERE id = ?;`,
      [req.params.id])
      .then(([rows, fields]) => {
        res.status(rows.length > 0 ? 200 : 404).send({res: rows});
      })
      .catch((err) => res.status(400).send({errno: err.errno}));
  }

  static deleteGiftcard(req, res) {
    pool.execute(
      `DELETE FROM GiftCards WHERE id = ?;`,
      [req.params.id])
      .then(([result, fields]) => {
        res.status(result.affectedRows > 0 ? 204 : 404).send();
      })
      .catch((err) => res.status(400).send({errno: err.errno}));
  }

  static updateGiftcard(req, res) {
    const { cardId, value, soldOn, soldBy, receivedOn, receivedBy} = req.body;
    pool.execute(
      `UPDATE GiftCards
      SET cardId=?, value=?, soldOn=?, soldBy=?, receivedOn=?, receivedBy=?
      WHERE id = ?;`,
      [cardId, value, soldOn, soldBy, receivedOn || null, receivedBy || null, req.params.id])
      .then(([result, fields]) => {
        res.status(result.affectedRows > 0 ? 204 : 404).send();
      })
      .catch((err) => res.status(400).send({errno: err.errno}));
  }
};

router.get('/', passport.authenticate('jwt', {session: false}), Giftcard.getAllGiftcards);
router.get('/:id', passport.authenticate('jwt', {session: false}), Giftcard.getSingleGiftcard);

router.post('/', passport.authenticate('jwt', {session: false}), Giftcard.insertGiftcard);
router.delete('/:id', passport.authenticate('jwt', {session: false}), Giftcard.deleteGiftcard);
router.put('/:id', passport.authenticate('jwt', {session: false}), Giftcard.updateGiftcard);


module.exports = router;
