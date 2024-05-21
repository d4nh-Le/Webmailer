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

    const temporaryToken = await DBService.registerUser(username, email, page);

    await transporter.sendMail({
    from: process.env.MAILER_EMAIL,
    to: email,
    subject: 'Please verify your email address',
    text: `Please verify your email address by clicking on the following link: http://${process.env.ENDPOINT_CONFIG}/verify?username=${username}&token=${temporaryToken}`,
  });

  res.status(200).json({ message: 'Registration successful. Please check your email to verify your account.' });
};

async function verifyUser(req, res) {
    const username = req.query.username;
    const token = req.query.token;

    const tokenExists = await DBService.tokenExits(username, token);

    if (!tokenExists) {
        return res.status(400).json({ error: 'Error: Invalid token' });
    }

    const officialToken = await DBService.verifyUser(username);

    const client_info = await DBService.getUserInfo(officialToken);
    
    if (!Array.isArray(client_info) || client_info.length === 0) {
        throw new Error('No user information found for this token');
    }

    const email = client_info[0].email;

            transporter.sendMail({
            from: process.env.MAILER_EMAIL,
            to: email,
            subject: 'Your Webmailer Token',
            text: `Your token is: ${officialToken}, please keep it somewhere safe.
            
            You can now use this token to send notifications to your website users.
            For more information, please visit: https://github.com/d4nh-Le/webmailer
            `,
          });

    res.status(200).json({ message: "Verification success!" });
};
  

module.exports = { registerUser, verifyUser };

