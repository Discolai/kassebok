const {getCsrfToken} = require('../utility');

function csrfValidator(req, res, next) {
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    next();
  } else if (req.originalUrl === "/api/users/login") {
    next();
  } else {
    const token = getCsrfToken(req.cookies.jwt01);
    if (req.headers["x-csrf-token"] === token) {
      next();
    } else {
      res.status(401).send("Invalid x-csrf-token");
    }
  }
}

module.exports = csrfValidator;
