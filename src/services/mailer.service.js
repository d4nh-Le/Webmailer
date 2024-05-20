const nodemailer = require('nodemailer');
const DBService = require('../databases/service/services.database');
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

    const isValidToken = await DBService.checkValidToken(req.query.key);
    if(!isValidToken) {
        res.status(400).json({ error: 'Error: Invalid Key' });
        return;
    }

    const isVerified = await DBService.getUserVerificationStatus(req.query.key);
    if(!isVerified) {
        res.status(400).json({ error: 'Error: User not verified' });
        return;
    }

    
    const client_location = await Locator.getGeoIp(req.query.ip);
    const currentTime = new Date().toLocaleString('en-GB').replace(',', '');
    
    DBService.getUserInfo(req.query.key).then((client_info) => {

        locatedUser = client_info[0];
        
        const mailOptions = {
            from: process.env.MAILER_EMAIL,
            to: locatedUser.email,
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
                Hi ${locatedUser.username}, someone just visited your page: ${req.query.page}.
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
    });

    
};



/*


*/

