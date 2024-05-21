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

/*
    Find the token in the Postgres DB
    @params {string} username
    @returns {Promise} Promise object represents the token
*/
function tokenLookUp(username) {
  const query = `SELECT token FROM users WHERE username = $1;`;
  return db.query(query, [username]);
}

/*
    Add a user to the Postgres DB
    @params {string} token
    @params {string} username
    @params {string} email
    @params {string} page
    @params {boolean} verified
    @returns {Promise} Promise object represents the user information
*/
function addUser(token, username, email, page, verified) {
  const query = `INSERT INTO users (token, username, email, website, verified) VALUES ($1, $2, $3, $4, $5);`;
  return db.query(query, [token, username, email, page, verified]);
}

/*
    Add a token to the Postgres DB
    @params {string} token
    @params {string} username
    @returns {Promise} Promise object represents the token
*/
function addToken(token, username, verified) {
  const query = `UPDATE users SET token = $1, verified = $2 WHERE username = $3;`;
  return db.query(query, [token, verified, username]);
}


module.exports = {
    getUserInfo,
    getUsername,
    getUserEmail,
    getUserWebsite,
    getUserVerificationStatus,
    addUser,
    tokenLookUp,
    addToken,
};