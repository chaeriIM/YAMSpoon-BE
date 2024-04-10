// 인증 관련 기능 : 사용자 인증, 사용자 등록, 비밀번호 관리, 권한 부여, 세션 관리
const { userDAO } = require('../data-access');
const bcrypt = require('bcrypt'); // 비밀번호 해싱
const jwt = require('jsonwebtoken'); // json 객체를 사용해서 정보를 표현, 검증
const config = require('../config');
const AppError = require('../misc/AppError');
const commonErrors = require('../misc/commonErrors');
const validator = require('validator');
const nodemailer= require('nodemailer');
const { mailService }= require('./');

class AuthService {

  //@desc 사용자 등록
  async signUp(userData) {
    const user = await userDAO.findUserById(userData.id);

    if (user) {
      throw new AppError(
        commonErrors.inputError,
        "이미 사용 중인 아이디입니다.",
        400,
      );
    }

    const { password, ...restUserData } = userData;
    const passwordRegex = /.^*[!@#$%^&*].{8,}$/;

    if (!passwordRegex.test(password)) {
      throw new AppError(
        commonErrors.inputError,
        '비밀번호는 최소 8자 이상이어야 하고 특수 문자를 포함해야 합니다.',
        400,
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    if (!validator.isEmail(userData.email)) {
      throw new AppError(
        commonErrors.inputError,
        '유효하지 않은 이메일 주소입니다.',
        400,
      );
    }
    
    const newUser = await userDAO.create({
      ...restUserData,
      password: hashedPassword,
    });

    return newUser;
  }
// 메일 인증 코드 확이하는 api

  //@desc 사용자 인증
  async getLogin(id, plainPassword) {
    const user = await userDAO.findUserById(id);

    if (!user) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        "아이디 또는 비밀번호가 일치하지 않습니다.",
        404,
      );
    }

    const passwordMatch = await bcrypt.compare(plainPassword, user.password);

    if (!passwordMatch) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        '아이디 또는 비밀번호가 일치하지 않습니다.',
        404,
      );
    }

    const userToken = jwt.sign(user, config.jwtSecret);
    return userToken;
  }

  //@desc delete userInfo
  async deleteUserInfo (id) {
    const deletedUser = await userDAO.deleteUser(id);

    return deletedUser;
  }
}

module.exports = AuthService();
