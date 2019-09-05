const db = require('../db.js');
const mysql = require('mysql');

const express = require('express');
const cors = require('cors');

const router = express.Router();

class Giftcard {
  static insertGiftcard(req, res) {
    const { card_id, value, sold_on, sold_by, received_on, received_by} = req.body;
    db.query(
      `INSERT INTO giftcards VALUES (?, ?, ?, ?, ?, ?);`,
      [card_id, value, sold_on, sold_by, received_on || null, received_by || null],
      (error, results, fields) => {
        if (error) {
          res.status(500).send({error: error.code});
        } else {
          res.status(results.affectedRows > 0 ? 204 : 400).send();
        }
    });
  }

  static getAllGiftcards(req, res) {
    db.query(
      `SELECT * FROM giftcards;`,
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
      `SELECT * FROM giftcards WHERE card_id = ?;`,
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
      `DELETE FROM giftcards WHERE card_id = ?;`,
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
    const { card_id, val, sold_on, sold_by, received_on, received_by} = req.body;
    db.query(
      `UPDATE giftcards
      SET card_id=?, value=?, sold_on=?, sold_by=?, received_on=?, received_by=?
      WHERE card_id = ?;`,
      [card_id, val, sold_on, sold_by, received_on || null, received_by || null, req.params.id],
      (error, results, fields) => {
        if (error) {
          res.status(500).send({error: error.code});
        } else {
          res.status(results.affectedRows > 0 ? 204 : 404).send();
        }
    });
  }
};

router.get('/', cors(), Giftcard.getAllGiftcards);
router.get('/:id', cors(), Giftcard.getSingleGiftcard);

router.post('/', cors(), Giftcard.insertGiftcard);
router.delete('/:id', cors(), Giftcard.deleteGiftcard);
router.put('/:id', cors(), Giftcard.updateGiftcard);


module.exports = router;
