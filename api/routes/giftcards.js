const db = require('../db.js');
const mysql = require('mysql');

const express = require('express');
const cors = require('cors');

const router = express.Router();

class Giftcard {
  static insertGiftcard(req, res) {
    const { cardId, value, soldOn, soldBy, receivedOn, receivedBy} = req.body;
    db.query(
      `INSERT INTO GiftCards
      (cardId, value, soldOn, soldBy, receivedOn, receivedBy)
      VALUES (?, ?, ?, ?, ?, ?);`,
      [cardId, value, soldOn, soldBy, receivedOn || null, receivedBy || null],
      (error, results, fields) => {
        if (error) {
          res.status(500).send({error: error.code});
        } else {
          res.status(results.affectedRows > 0 ? 200 : 400)
          .send({insertId: results.insertId});
        }
    });
  }

  static getAllGiftcards(req, res) {
    db.query(
      `SELECT * FROM GiftCards ORDER BY cardId;`,
      (error, results, fields) => {
        if (error) {
          res.status(500).send({error: error.code});
        } else {

          res.status(results.length > 0 ? 200 : 404);
          res.send({res: results});
        }
    });
  }

  static getSingleGiftcard(req, res)  {
    db.query(
      `SELECT * FROM GiftCards WHERE id = ?;`,
      [req.params.id],
      (error, results, fields) => {
        if (error) {
          res.status(500).send({error: error.code});
        } else {
          res.status(results.length > 0 ? 200 : 404);
          res.send({res: results});
        }
    });
  }

  static deleteGiftcard(req, res) {
    db.query(
      `DELETE FROM GiftCards WHERE id = ?;`,
      [req.params.id],
      (error, results, fields) => {
        if (error) {
          res.status(500).send({error: error.code});
        } else {
          res.status(results.affectedRows > 0 ? 204 : 404).send();
        }
    });
  }

  static updateGiftcard(req, res) {
    const { cardId, value, soldOn, soldBy, receivedOn, receivedBy} = req.body;
    db.query(
      `UPDATE GiftCards
      SET cardId=?, value=?, soldOn=?, soldBy=?, receivedOn=?, receivedBy=?
      WHERE id = ?;`,
      [cardId, value, soldOn, soldBy, receivedOn || null, receivedBy || null, req.params.id],
      (error, results, fields) => {
        if (error) {
          res.status(500).send({error: error.code});
        } else {
          res.status(results.affectedRows > 0 ? 204 : 404).send();
        }
    });
  }
};

router.options('/', cors());
router.options('/:id', cors());

router.get('/', cors(), Giftcard.getAllGiftcards);
router.get('/:id', cors(), Giftcard.getSingleGiftcard);

router.post('/', cors(), Giftcard.insertGiftcard);
router.delete('/:id', cors(), Giftcard.deleteGiftcard);
router.put('/:id', cors(), Giftcard.updateGiftcard);


module.exports = router;
