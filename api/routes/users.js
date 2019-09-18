const {pool} = require('../config/mysql.js');

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const validator = require('email-validator');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const {JWT_EXPIRATION_MIN, JWT_EXPIRATION_MS, secret} = require('../config/serverconf');


const router = express.Router();

class Users {

  // Implements some of the NIST password guidelines
  static async validatePassword(password, password2, errors)  {
    if (password.length < 8) errors.push({msg: "Passwords must be at least 8 characters long"});
    if (password.length > 64) errors.push({msg: "Passwords cannot be longer than 64 characters"});
    if (password !== password2) errors.push({msg: "Passwords do not match"});
  }

  static async validateEmail(email, errors) {
    if (!validator.validate(email)) errors.push({msg: "Email is not valid"});
    if (email.length > 40) errors.push({msg: "Emails cannot be longer than 40 characters"});

    const [rows, fields] = await pool.execute(`SELECT * FROM Users WHERE email=?;`, [email]);
    if (rows.length) errors.push({msg: "Email is already registered"});
  }

  static async validateUserName(userName, errors) {
    if (userName.length > 40) errors.push({msg: "Usernames cannot be longer than 40 characters"});

    const [rows, fields] = await pool.execute(`SELECT * FROM Users WHERE userName=?;`, [userName]);
    if (rows.length) errors.push({msg: "Username is already registered"});
  }

  static insertUser(req, res) {
    const {email, userName, password, password2} = req.body;
    const errors = [];
    const promises = [];

    promises.push(Users.validatePassword(password, password2, errors));
    promises.push(Users.validateUserName(userName, errors));
    promises.push(Users.validateEmail(email, errors));

    Promise.all(promises)
    .then(() => {
      if (errors.length) {
        throw "Invalid user";
      } else {
        bcrypt.hash(password, 12)
        .then((hash) => {
          pool.execute(
            `INSERT INTO Users (email, userName, password)
            VALUES (?, ?, ?);`,
            [email, userName, hash])
          .then(([rows, fields]) =>  {
            console.log(rows);
            res.send({insertId: rows.insertId});
          })
          .catch((err) => res.status(500).send({err: err.code}));
        })
        .catch((err) => res.status(500).send({err: err}));
      }
    })
    .catch((err) => {
      res.status(400).send({errors: errors});
    });

  }

  static deleteUser(req, res) {
    pool.execute(`DELETE FROM Users WHERE id=?`, [req.user.id])
    .then(([result, fields]) => {
      res.status(result.affectedRows > 0 ? 204 : 400).send();
    })
    .catch((err) => res.status(500).send({err: err.code}));
  }

  static loginUser(req, res)  {
    pool.execute(`INSERT INTO Tokens (user, exp) VALUES (?, ADDTIME(NOW(), ?));`, [req.user.id, `0:${JWT_EXPIRATION_MIN}:0`])
    .then(([result, fields]) => {
      if (result) {
        const payload = {
          sub: result.insertId,
          userName: req.user.userName,
          email: req.user.email,
          exp: Date.now() + JWT_EXPIRATION_MS
        };
        jwt.sign(payload, secret, (err, token) => {
          if (err) {
            res.status(500).send(err);
          } else {
            res.setHeader('Authorization', 'Bearer ' + token);
            res.send();
          }
        });
      }
    })
    .catch((err) => res.status(500).send({err: err.code}));
  }

  static logoutUser(req, res) {
    pool.execute(`DELETE FROM Tokens WHERE id=?;`, [req.user.sub])
    .then(([result, fields]) => {
      res.status(result.affectedRows > 0 ? 204 : 400).send();
    })
    .catch((err) => res.status(500).send({err: err.code}));
  }
}


router.options('/register', cors());
router.options('/delete', cors());
router.options('/login', cors());
router.options('/logout', cors());

router.post('/register', cors(), Users.insertUser);
router.post('/delete', passport.authenticate('local', {session: false}), cors(), Users.deleteUser);
router.post('/login', passport.authenticate('local', {session: false}), cors(), Users.loginUser);
router.post('/logout', passport.authenticate('jwt', {session: false}), cors(), Users.logoutUser);

module.exports = router;
