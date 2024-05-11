require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const app = express();
const port = process.env.PORT || 8080;

const mailerService = require('./src/services/mailer.service');
const Sanitizer = require('./src/utilities/sanitize.utility');
const Validator = require('./src/utilities/validation.utility');


app.use(cors());
app.use(helmet());

// app.put('/registration', )
app.get('/pageVisited', [Validator.validateRequestParameters, Sanitizer.sanitizeKey, Sanitizer.sanitizeWebsitePage, Validator.validateKey, Validator.validateWebsitePage], 
  mailerService.sendNotification
);
    

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});