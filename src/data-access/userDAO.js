const mongoose = require('mongoose');
const {User} = require('./model');

class UserDAO {

  //@desc get userInfo
  async findById (id) {
    const user = await User.findById(id).lean();
    return user;
  }

  //@desc create userInfo
  async create (userData) {
    const user = new User.creat(userData).lean();
    return user;
  }

  async updeateUser (id, updateData) {
    const updateUser = await User.findByIdAndUpdate (id, updateData).lean();

    return updateUser;
  }

  async deleteUser (id) {
    return User.deleteOne(id);
  }
}