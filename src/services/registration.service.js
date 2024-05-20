const uuid = require('uuid');
const nodemailer = require('nodemailer');
const DBService = require('../databases/service/services.database');

const mailService = 'gmail';

const transporter = nodemailer.createTransport({
    service: mailService,
    auth: {
        user: process.env.MAILER_EMAIL,
        pass: process.env.MAILER_PASSWORD
    }
});

async function registerUser(req, res) {
    const email = req.query.email;
    const page = req.query.page;
    const username = req.query.username;
  
    const verifyToken = uuid.v4();

    await transporter.sendMail({
    from: process.env.MAILER_EMAIL,
    to: email,
    subject: 'Please verify your email address',
    text: `Please verify your email address by clicking on the following link: http://${process.env.ENDPOINT_CONFIG}/verify?token=${verifyToken}`,
  });

  await DBService.registerUser(username, email, page);

  res.status(200).json({ message: 'Registration successful. Please check your email to verify your account.' });
};
  

module.exports = { registerUser };

