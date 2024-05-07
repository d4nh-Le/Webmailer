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

    const currentTime = new Date().toISOString();
    const mailOptions = 
    {
        from: process.env.MAILER_EMAIL,
        to: client_info.email,
        subject: "Hi " + client_info.username + ", someone just visited your page: " + req.query.website_page,
        text: "Page:" + req.query.website_page + "Time:" + currentTime
    };

    const client_info = keyModule.getKeyInfo(req.query.key)[0];

    if (!client_info) {
        res.status(404).json({ error: 'Key not found' });
        return;
    }

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

