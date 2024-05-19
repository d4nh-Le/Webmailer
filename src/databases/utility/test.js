const db = require('../connection/connection_pool.database'); 

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });

// db.readerQuery('SELECT * FROM users', [], (err, res) => {
//   if (err) {
//     console.error('Error executing query', err.stack);
//   } else {
//     console.log(res.rows);
//   }
// });

console.log(process.env.MAILER_HOST);
console.log(process.env.MAILER_DB_RU);
console.log(process.env.MAILER_DB_RP);
