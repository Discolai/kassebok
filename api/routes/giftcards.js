const db = require('../db.js');
const mysql = require('mysql');

const express = require('express');
const router = express.Router();


class Giftcard {
  static insertGiftcard(req, res) {
    const { card_id, val, sold_on, sold_by, received_on, received_by} = req.body;
    db.query(
      `INSERT INTO giftcards VALUES (?, ?, ?, ?, ?, ?);`,
      [card_id, val, sold_on, sold_by, received_on, received_by],
      (error, results, fields) => {
        if (error) {
          res.status(500).send({error: error.code});
        }
        res.status(results.affectedRows > 0 ? 204 : 400).send();
    });
  }

  static getAllGiftcards(req, res) {
    db.query(
      `SELECT * FROM giftcards;`,
      (error, results, fields) => {
        if (error) {
          res.status(500).send({error: error.code});
        }

        res.status(results.affectedRows > 0 ? 200 : 404);
        res.json({res: results}).send();
    });
  }

  static getSingleGiftcard(req, res)  {
    db.query(
      `SELECT * FROM giftcards WHERE card_id = ?;`,
      [req.params.id],
      (error, results, fields) => {
        if (error) {
          res.status(500).send({error: error.code});
        }

        res.status(results.length > 0 ? 200 : 404);
        res.json({res: results}).send();
    });
  }

  static deleteGiftcard(req, res) {
    db.query(
      `DELETE FROM giftcards WHERE card_id = ?;`,
      [req.params.id],
      (error, results, fields) => {
        if (error) {
          res.status(500).send({error: error.code});
        }
        res.status(results.affectedRows > 0 ? 204 : 404).send();
    });
  }

  static updateGiftcard(req, res) {
    const { card_id, val, sold_on, sold_by, received_on, received_by} = req.body;
    db.query(
      `UPDATE giftcards
      SET card_id=?, value=?, sold_on=?, sold_by=?, received_on=?, received_by=?
      WHERE card_id = ?;`,
      [card_id, val, sold_on, sold_by, received_on, received_by, req.params.id],
      (error, results, fields) => {
        if (error) {
          res.status(500).send({error: error.code});
        }
        res.status(results.affectedRows > 0 ? 204 : 404).send();
    });
  }
};

router.get('/', Giftcard.getAllGiftcards);
router.get('/:id', Giftcard.getSingleGiftcard);

router.post('/', Giftcard.insertGiftcard);
router.delete('/:id', Giftcard.deleteGiftcard);
router.put('/:id', Giftcard.updateGiftcard);


module.exports = router;
