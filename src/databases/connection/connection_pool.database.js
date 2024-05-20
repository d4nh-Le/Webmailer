const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });

const pool = new Pool({
  user: process.env.MAILER_DB_U,
  host: process.env.MAILER_HOST,
  database: process.env.MAILER_DB,
  password: process.env.MAILER_DB_P,
  port: process.env.MAILER_PORT
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
