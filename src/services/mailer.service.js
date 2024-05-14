const nodemailer = require('nodemailer');
const keyModule = require('../utilities/key.utility');
const Locator = require('../utilities/geoip.utility');

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

    const client_info = await keyModule.getKeyInfo(req.query.key)[0];
    const client_location = await Locator.getGeoIp(req.query.ip);
    const currentTime = new Date().toLocaleString('en-GB').replace(',', '');
    

    const mailOptions = {
        from: process.env.MAILER_EMAIL,
        to: client_info.email,
        subject: "Hi " + client_info.username + ", someone just visited your page: " + req.query.page,
        html: `<p>Page: <strong>${req.query.page}</strong></p>
        <p>Time: <strong>${currentTime} GMT-6</strong></p>
        <p>Location: <strong>${client_location}</strong></p>
        <p>Referer: <strong>${req.query.referer ? req.query.referer : "Unavailable"}</strong></p>`
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

