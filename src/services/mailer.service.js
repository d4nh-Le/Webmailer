const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "webm4iler@gmail.com",
        pass: "ewgeexrxlspfrstm"
    }
});

const mailOptions = {
    from: "webm4iler@gmail.com",
    to: "danhle002@gmail.com",
    subject: "Test email",
    text: "This is a test email"
}

exports.sendNotification = async (req, res) => {
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

