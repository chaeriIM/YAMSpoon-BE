const { authService } = require('../service');
const utils = require('../misc/utils');
const AppError = require('../misc/AppError');
const commonErrors = require('../misc/commonErrors');

const authController = {
  //@desc Create user
  //@route POST / user
  async postSignUp (req, res, next) {
    try {
      const { userData } = req.body;

      const newUser = await authService.signUp( userData );

      res.status(201).json(utils.buildResponse(newUser));
    } catch (error) {
      next(error);
    }
  },

  //@desc verify Id
  //@route POST / auth/veriftId
  async postVerifyId (req, res, next) {
    try {
      const { id } = req.body;

      const newUser = await authService.verifyId(id);

      res.json(result);
    } catch (error) {
      next(error);
    }
  },

  //@desc verify nickname
  //@route POST /auth/verifyNickname
  async postVerifyNickname (req,res,next) {
    try {
      const { nickname } = req.body;
      const newUser = await authService.verifyNickname(nickname);
      res.json(result);
    } catch (error) {
      next(error);
    }
  },

  //@desc login
  //@route POST /login
  async postLogin (req,res,next) {
    try {
      const { userId, userPassword } = req.body;
      const token = await authService.Login ({
        userId,
        plainPassword : userPassword,
      });
      res.status(201).json(utils.buildResponse(token));
    } catch (error) {
      next(error);
    }
  },

  //@desc delete userInfo
  //@route DELETE /user/{id}
  async deleteUserInfo (req,res,next) {
    try {
      const id = req.params.id;
      const deleteUser = await authService.deleteUserInfo(id);
      res.status(200).json ({
        message: '사용자가 성공적으로 삭제되었습니다.',
        user: deleteUser,
      });
    } catch (error) {
      next (error);
    }
  }
}

module.exports = authController;