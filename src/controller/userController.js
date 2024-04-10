const { userService } = require('../service');
const utils = require('../misc/utils');

const userController = {
  //@desc get userInfo
  //@route GET /user/{id}
  async getUserInfo (req,res,next) {
    try {
      const userId = req.params.id;
      const userInfo = await userService.getUserInfo(userId);
      res.status(200).json(utils.buildResponse(userInfo));
    } catch (error) {
      next(error);
    }
  },

  //@desc update userInfo
  //@route PUT / user/{id}
  async putUpdateUser (req,res,next) {
    try {
      const userId = req.params.id;
      const updateInfo = req.body;
      const updateUser = await userService.updateUser(userId, updateInfo);
      res.status(200).json(utils.buildResponse(updateUser));
    } catch (error) {
      next(error);
    }
  },

  //@desc find userId
  //@route POST /findUserid
  async postUserId (req,res,next) {
    try {
      const { name, email } = req.body;
      const userId = await userService.findUserIdByNameAndEmail({ name, email });
      res.status(200).json(utils.buildResponse(userId));
    } catch (error) {
      next(error);
    }
  },

  //@desc find userPassword
  //@route POST /findUserPassword
  async postUserPassword (req,res,next) {
    try {
      const { userId, email } = req.body;
      const user = await userService.findUserPasswordByIdAndEmail( {userId, email });
      res.status(200).json(utils.buildResponse(user));
    } catch (error) {
      next(error);
    }
  },

  //@desc reset user password
  //@route PUT /resetPassword/{id}
  async putResetPassword (req,res,next) {
    try {
      const userId = req.params.id;
      const newPassword = req.body;
      const updatePassword = await userService.resetPassword(userId, newPassword);
      res.status(200).json(utils.buildResponse(updatePassword));
    } catch (error) {
      next(error);
    }
  },

  //@desc get user fridge
  //@route GET /user/{id}/fridge
  async getUserFridge (req,res,next) {
    try {
      const userId = req.params.id;
      const fridgeRecipe = await userService.getUserFridge(userId);
      res.status(200).json(utils.buildResponse(fridgeRecipe));
    } catch (error) {
      next(error);
    }
  },

  //@desc update user ingredients
  //@route PUT /user/{id}/fridge
  async putUpdateUserIngredients (req,res,next) {
    try {
      const userId = req.params.id;
      const updateData = req.body;
      const updateIngredients = await userService.updateUserIngredients(userId, updateData);
      res.status(200).json(utils.buildResponse(updateIngredients));
    } catch (error) {
      next(error);
    }
  },

  //@desc update user bookmark
  //@route PUT /user/{id}/bookmark
  async putUpdateBookmark (req,res,next) {
    try {
      const userId = req.params.id;
      const updateData = req.body;
      const updateBookmark = await userService.updateBookmark(userId,updateData);
      res.status(200).json(utils.buildResponse(updateBookmark));
    } catch (error) {
      next(error);
    }
  },

}

module.exports = userController;