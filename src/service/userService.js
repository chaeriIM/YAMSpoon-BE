// find user & update user
const { userDAO } = require('../data-access');
const AppError = require('../misc/AppError');
const commonErrors = require('../misc/commonErrors');
const bcrypt = require('bcrypt');

class UserService {

  //@desc find user info by ID
  async getUserInfo (id) {
    const user = await userDAO.findUserById(id);
    if(!user) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        "해당하는 사용자를 찾을 수 없습니다.",
        404,
      );
    }

    const userInfo = {
      userId : user.userId,
      name : user.name,
      email : user.email,
      password : user.password,
      nickname : user.nickname,
      isAdmin : user.isAdmin,
      recipe : user.recipe,
      ingredients : user.ingredients,
      verificationCode : user.verificationCode,
    };

    return userInfo;
  }
  
  //@desc update user Info
  async updateUser (id, updateData) {
    const user = await userDAO.findUserById(id);

    if(!user) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        '해당하는 사용자를 찾을 수 없습니다.',
        404,
      );
    }

    const updateUser = await userDAO.updateUser(id,updateData);

    return updateUser
  }
  
    //@desc delete userInfo
    async deleteUserInfo (id) {
      const deletedUser = await userDAO.deleteUser(id);
  
      return deletedUser;
    }


  //@desc find userId
  async findUserIdByNameAndEmail (name, email) {
    const user = await userDAO.finduserId(name, email);

    if(!user) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        '해당하는 사용자를 찾을 수 없습니다.',
        404,
      );
    }

    return user.userId;
  }

  //@ find userPassword
  async findUserPasswordByIdAndEmail (userId, email) {
    const user = await userDAO.finduserPassword (userId, email);

    if(!user) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        '해당하는 사용자를 찾을 수 없습니다.',
        404,
      );
    }

    return user;
  }

  //@desc reset user password
  async resetPassword(userId, newPassword) {
    const user = await userDAO.findUserByUserId(userId);
    console.log(user)

    if(!user) {
      throw new AppError (
        commonErrors.resourceNotFoundError,
        '해당하는 사용자를 찾을 수 없습니다.',
        404,
      )
    }

    user.password = await bcrypt.hash(newPassword, 12);
    // console.log(user.password);
    await user.save();

    return user;
  }
  
  //@desc get user fridge recipe
  async getUserFridge (id) {
    const user = await userDAO.findUserById(id);
    // console.log(user);
    if(!user) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        '해당하는 사용자를 찾을 수 없습니다.',
        404,
      );
    }

    return user.recipe;
  }

  //@desc update user ingredients
  async updateUserIngredients (id,updateIngredients) {
    const user = await userDAO.findUserById(id);

    if(!user) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        '해당하는 사용자를 찾을 수 없습니다.',
        404,
      );
    }

    const updateInfo = await userDAO.updateUser(id, updateIngredients);

    return updateInfo;
  }

  //@desc update user bookmark
  async updateBookmark (id, updateBookmark) {
    const user = await userDAO.findUserById(id);

    if(!user) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        '해당하는 사용자를 찾을 수 없습니다.',
        404,
      );
    }

    const updateInfo = await userDAO.updateUser(id, updateBookmark);

    return updateInfo;
  }
}

module.exports = new UserService();