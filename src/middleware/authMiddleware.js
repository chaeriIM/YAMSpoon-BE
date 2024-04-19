const jsonwebtoken = require('jsonwebtoken');
const config = require('../config');
const { User }= require('../data-access/model')

const isAuthenticated = (req, res, next) => {
  if (req.headers["authorization"] === undefined) {
    return res.status(401).json({
      error: "권한이 없거나 인증되지 않은 유저입니다.",
      data: null,
    });
  }

  const token = req.headers["authorization"].slice(7);
  const userInfo = jsonwebtoken.verify(token, config.jwtSecret);

  res.locals.user = {
    id: userInfo.id,
    userId: userInfo.userId,
    email: userInfo.email,
    nickname: userInfo.nickname, 
    isAdmin: userInfo.isAdmin,
    recipe: userInfo.recipe,
    ingredients: userInfo.ingredients,
  };

  next();
};

module.exports = {
  isAuthenticated,
};