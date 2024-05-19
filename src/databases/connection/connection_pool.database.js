const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });

const reader = new Pool({
  user: process.env.MAILER_DB_RU,
  password: process.env.MAILER_DB_RP,
  host: process.env.MAILER_HOST,
  database: process.env.MAILER_DB,
  port: process.env.MAILER_PORT,
});

const writer = new Pool({
  user: process.env.MAILER_DB_WU,
  password: process.env.MAILER_DB_WP,
  host: process.env.MAILER_HOST,
  database: process.env.MAILER_DB,
  port: process.env.MAILER_PORT,
});

module.exports = {
  readerQuery: (text, params, callback) => {
    return reader.query(text, params, callback);
  },
  writerQuery: (text, params, callback) => {
    return writer.query(text, params, callback);
  },
};