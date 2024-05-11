const nodemailer = require('nodemailer');
const keyModule = require('../utilities/key.utility');

const mailService = 'gmail';

const transporter = nodemailer.createTransport({
    service: mailService,
    auth: {
        user: process.env.MAILER_EMAIL,
        pass: process.env.MAILER_PASSWORD
    }
});


exports.sendNotification = async (req, res) => {

    if(keyModule.checkValidKey(req.query.key) === false) {
        res.status(400).json({ error: 'Error: Invalid Key' });
        return;
    }

    const client_info = keyModule.getKeyInfo(req.query.key)[0];
    const currentTime = new Date().toISOString();
    const mailOptions = 
    {
        from: process.env.MAILER_EMAIL,
        to: client_info.email,
        subject: "Hi " + client_info.username + ", someone just visited your page: " + req.query.page,
        text: "Page:" + req.query.page + "Time:" + currentTime + "IP:" + req.query.ip + "Referer:" + req.query.referer
    };

    transporter.sendMail(mailOptions, (err, info) => { 
        if(err) {
            console.log(err);
            res.status(500).json({ error: err.message });
        } else {
            console.log(info);
            res.status(200).json(info);
        }
    });
};

