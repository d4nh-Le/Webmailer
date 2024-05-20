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

/*
    Get user verification status from Postgres DB
    @params {string} token
    @returns {Promise} Promise object represents the user verification status
*/
function getUserVerificationStatus(token) {
  const query = `SELECT verified FROM users WHERE token = $1;`;
  return db.query(query, [token]);
}

function addUser(username, email, page, verified) {
  const query = `INSERT INTO users (username, email, website, verified) VALUES ($1, $2, $3, $4);`;
  return db.query(query, [username, email, page, verified]);
}

module.exports = {
    getUserInfo,
    getUsername,
    getUserEmail,
    getUserWebsite,
    getUserVerificationStatus,
    addUser,
};