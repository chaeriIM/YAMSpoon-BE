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
    req.session.verificationCode = verificationCode;

    const mailOptions =  {
      from : config.mailId,
      to: email,
      subject: 'YAMSpoon 인증 이메일',
      text: `메일 인증을 완료하려면 다음 인증번호를 입력하세요: ${verificationCode}`,
    };

    await transporter.sendMail(mailOptions);

    return verificationCode;
  }

  //@desc verify verificationCode
  async verifyVerificationCode (res, req, input) {
    const savedCode = req.session.verificationCode;
    const savedUserInput = req.cookies.userInputCode;

    if(savedCode && savedUserInput && savedCode === inputCode && savedCode === savedInputUser) {
      res.send('Verification Successful');
    } else {
      res.send('Invalid Verification Code');
    }
  }
}

module.exports = new MailService ();