const DBUtils = require('../utility/utilities.database');
const Encryptor = require('../../utilities/encryption.utility');
const TokenModule = require('../../utilities/token.utility');


/*
    Check if the token is valid
    @params {string} token
    @returns {boolean} true if the token is valid, false otherwise
*/
async function checkValidToken(token) {
    hashedToken = Encryptor.encrypt(token);

    try {
        const userInfo = await DBUtils.getUserInfo(hashedToken);
        if (userInfo.rows.length === 0) {
           return false;
        } else {

            return true;
        }
    }
    catch (error) {
        console.error('Error checking token:', error);
    }
}

/*
    Get user info
    @params {string} token
    @returns {object} user info
*/
async function getUserInfo(token) {
    hashedToken = Encryptor.encrypt(token);

    try {
        const userInfo = await DBUtils.getUserInfo(hashedToken);
        return userInfo.rows;
    }
    catch (error) {
        console.error('Error getting user info:', error);
        return null;
    }
};

async function getUserVerificationStatus(token) {
    hashedToken = Encryptor.encrypt(token);

    try {
        const userInfo = await DBUtils.getUserVerificationStatus(hashedToken);
        
        if (userInfo.rows.length === 0) {
            return false;
        }

        if (userInfo.rows[0].verified) {
            return true;
        } else {
            return false;
        }
    }
    catch (error) {
        console.error('Error getting user info:', error);
        return null;
    }
}

async function registerUser(username, email, page) {

    verified = false;

    try {
        await DBUtils.addUser(username, email, page, verified);
        return "User added successfully!";
    }
    catch (error) {
        console.error('Error adding user:', error);
    }
}

module.exports = {
    checkValidToken,
    getUserInfo,
    getUserVerificationStatus,
    registerUser,
};