require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const app = express();
const path = require('path');
// eslint-disable-next-line no-process-env
const port = process.env.PORT || 8080;

const mailerService = require('./src/services/mailer.service');
const registerService = require('./src/services/registration.service');

const mailerSanitizer = require('./src/utilities/mailer_utilities/Mailer_sanitize.utility');
const mailerValidator = require('./src/utilities/mailer_utilities/Mailer_validation.utility');

const registrationSanitizer = require('./src/utilities/registration_utilities/Registration_sanitize.utility');
const registrationValidator = require('./src/utilities/registration_utilities/Registration_validation.utility');

const verifySanitizer = require('./src/utilities/verify_utilities/Verify_sanitize.utility');
const verifyValidator = require('./src/utilities/verify_utilities/Verify_validation.utility');


app.use(cors());
app.use(helmet());

app.get('/verify', [verifySanitizer.sanitizeVerify, verifyValidator.validateVerify],
registerService.verifyUser);

app.get('/registration', [registrationSanitizer.sanitizeRegistration, registrationValidator.validateRegistration], 
  registerService.registerUser);

app.get('/trigger', [mailerSanitizer.sanitizeQuery, mailerValidator.ValidateQuery], 
  mailerService.sendNotification
);

// production mode
// after build is generated
app.use(express.static(path.join(__dirname, 'frontend/build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});
    

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});