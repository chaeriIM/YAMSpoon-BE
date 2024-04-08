// find user & update user
const { userDAO } = require('../data-access');
const AppError = require('../misc/AppError');
const commonErrors = require('../misc/commonErrors');

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
      id : user.id,
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

    const updateUser = await userDAO.updateUser(updateData);

    return updateUser
  }


  //@desc find userId
  async findUserIdByNameAndEmail (inputData) {
    const user = await userDAO.finduserId(inputData);

    if(!user) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        '해당하는 사용자를 찾을 수 없습니다.',
        404,
      );
    }

    return user.id;
  }

  //@ find userPassword
  async findUserPasswordByIdAndEmail (inputData) {
    const user = await userDAO.findUserByNameAndEmail (inputData);

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
  async resetPassword(userId, email, temporaryPassword) {
    const user = await userDAO.findUserByIdAndEmail(userId, email);

    user.password = await bcrypt.hash(temporaryPassword, 12);
    await user.save();

    return user;
  }
  
  //@desc get user fridge recipe
  async getUserFridge (id) {
    const user = await userDAO.findUserById(id);

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