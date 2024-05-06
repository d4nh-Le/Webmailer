const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8080;

const mailerService = require('./src/services/mailer.service');

require('dotenv').config();

app.use(cors());



app.get('/pageVisited', mailerService.sendNotification);
    

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});