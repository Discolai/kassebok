const {pool} = require('./mysql');
const bcrypt = require('bcrypt');

const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const {secret} = require('./serverconf');

const localStrategy = new LocalStrategy({
  usernameField: 'nameEmail',
  passwordField: 'password'
  },
  (nameEmail, password, done) => {
    pool.execute(`SELECT * FROM Users WHERE userName=? OR email=?;`, [nameEmail, nameEmail])
      .then(([rows, fields]) => {
        if (!rows.length) return done(null, false);
        const user = rows[0];

        bcrypt.compare(password, user.password)
          .then((res) => {
            return res ? done(null, user) : done(null, false);
          })
          .catch((err) => done(err));
      })
      .catch((err) => done(err));
    }
);

const jwtStrategy = new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  // jwtFromRequest: req => req.cookies.jwt,
  secretOrKey: secret
  },
  (jwtPayload, done) => {
    // TODO: Check against database
    if (Date.now() > jwtPayload.exp) {
      return done(null, false, 'jwt expired');
    } else {
      pool.execute(`SELECT * FROM Tokens WHERE id=?;`, [jwtPayload.sub])
        .then(([rows, fields]) => {
          if (!rows.length) {
            return done(null, false, 'jwt invalid');
          } else {
            return done(null, jwtPayload);
          }
        })
        .catch((err) => done(err.code));
    }

  }
);

module.exports = {localStrategy, jwtStrategy};
