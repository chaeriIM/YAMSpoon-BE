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
  }
}