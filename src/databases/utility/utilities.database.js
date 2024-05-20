const db = require('../connection/connection_pool.database'); 


/*
    Get user information from Postgres DB
    @params {string} token
    @returns {Promise} Promise object represents the user information
*/
function getUserInfo(token) {
  const query = `SELECT * FROM users WHERE token = $1;`;
  return db.query(query, [token]);
}


/*
    Get username from Postgres DB
    @params {string} token
    @returns {Promise} Promise object represents the username
*/
function getUsername(token) {
    const query = `SELECT username FROM users WHERE token = $1;`;
    return db.query(query, [token]);
    }

/*
    Get user email from Postgres DB
    @params {string} token
    @returns {Promise} Promise object represents the user email
*/
function getUserEmail(token) {
  const query = `SELECT email FROM users WHERE token = $1;`;
  return db.query(query, [token]);
}

/*
    Get user website from Postgres DB
    @params {string} token
    @returns {Promise} Promise object represents the user website
*/
function getUserWebsite(token) {
  const query = `SELECT website FROM users WHERE token = $1;`;
  return db.query(query, [token]);
}

module.exports = {
    getUserInfo,
    getUsername,
    getUserEmail,
    getUserWebsite
};