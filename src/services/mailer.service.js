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
        subject: "Notification from your website",
        html:`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Your Email Title</title>
            <!-- Other meta tags or styles -->
        </head>
        <body>
            <!-- Preheader Text -->
            <div style="display:none;font-size:1px;color:#fefefe;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">
            Hi ${client_info.username}, someone just visited your page: ${req.query.page}.
            </div>

            <div style="display:none;font-size:1px;color:#fefefe;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">
            ${"\u200C".repeat(500)}
        </div>
            
            <!-- Your email content -->
        <h3>Someone visited your website:</h3>
        <div style="background-color: #f0f0f0; padding: 10px 20px 10px 10px; display:inline-block">
        <p>Page: <strong>${req.query.page}</strong></p>
        <p>Time: <strong>${currentTime} GMT-6</strong></p>
        <p>Location: <strong>${client_location}</strong></p>
        <p>Referer: <strong>${req.query.referer ? req.query.referer : "Unavailable"}</strong></p>
        </div>
        </body>
        <footer>
            <h6>Offered by Webmailer. For more information, visit <a href="https://github.com/d4nh-Le/webmailer">Webmailer Github</a> for support and suggestion.</h6>
        </html>
    `
};

    transporter.sendMail(mailOptions, (err, info) => { 
        if(err) {
            console.log(err);
            res.status(500).json({ error: err.message });
        } else {
            console.log(info);
            res.status(200).json({ message: 'Sucessfully triggered.' });
        }
    });
};

