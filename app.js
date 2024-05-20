require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const app = express();
const port = process.env.PORT || 8080;

const mailerService = require('./src/services/mailer.service');
const registerService = require('./src/services/registration.service');

const Sanitizer = require('./src/utilities/mailer_utilities/Mailer_sanitize.utility');
const Validator = require('./src/utilities/mailer_utilities/Mailer_validation.utility');


app.use(cors());
app.use(helmet());

app.put('/registration',  )

app.get('/trigger', [Sanitizer.sanitizeQuery, Validator.ValidateQuery], 
  mailerService.sendNotification
);
    

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});