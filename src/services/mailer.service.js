const nodemailer = require('nodemailer');

const mailService = 'gmail';

const transporter = nodemailer.createTransport({
    service: mailService,
    auth: {
        user: process.env.MAILER_EMAIL,
        pass: process.env.MAILER_PASSWORD
    }
});

exports.sendNotification = async (req, res) => {

    const mailOptions = 
    {
        from: process.env.MAILER_EMAIL,
        to: req.query.destination,
        subject: req.query.destination_subject,
        text: req.query.destination_text,
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

