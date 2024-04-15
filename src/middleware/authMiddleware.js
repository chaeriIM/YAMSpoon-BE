const jsonwebtoken = require('jsonwebtoken');
const config = require('../config');

const isAuthenticated = (req, res, next) => {
  if (req.headers["authorization"] === undefined) {
    res.status(401).json({
      error:
        "권한이 없거나 인증되지 않은 유저입니다.",
      data: null,
    });
  }

  const token = req.headers["authorization"].slice(7);
  const userInfo = jsonwebtoken.verify(token, config.jwtSecret);

  res.locals.user = userInfo;
  next();
};

module.exports = {
  isAuthenticated,
};