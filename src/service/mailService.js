const nodemailer = require('nodemailer');
const config = require('../config');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');

class MailService {
  //@desc send mail
  async sendVerificationEmail (email) {
    const adminAccount = {
      service : 'gmail',
      auth: {
        user: config.mailId,
        pass: config.mailPassword,
      }
    };

    const transporter = nodemailer.createTransport(adminAccount);
    const verificationCode = Math.floor(100000+Math.random()*900000);

    const mailOptions =  {
      from : config.mailId,
      to: email,
      subject: 'YAMSpoon 인증 이메일',
      text: `메일 인증을 완료하려면 다음 인증번호를 입력하세요: ${verificationCode}`,
    };

    await transporter.sendMail(mailOptions);

    return verificationCode;
  }
}

module.exports = new MailService ();