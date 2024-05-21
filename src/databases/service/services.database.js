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

/*
    Get user verification status
    @params {string} token
    @returns {boolean} true if the user is verified, false otherwise
*/
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

async function tokenExits(username, token) {
    try {
        const userToken = await DBUtils.tokenLookUp(username);
        if (userToken.rows.length === 0) {
            return false;
        }

        if (userToken.rows[0].token === token) {
            return true;
        } else {
            return false;
        }
    }
    catch (error) {
        console.error('Error checking token:', error);
    }
}


/*
    Register a user
    @params {string} username
    @params {string} email
    @params {string} page
    @returns {string} temporary hashedToken
*/
async function registerUser(username, email, page) {
    temporaryToken = TokenModule.generateToken();

    hashedToken = Encryptor.encrypt(temporaryToken);
    verified = false;

    try {
        await DBUtils.addUser(hashedToken, username, email, page, verified);
        return hashedToken;
    }
    catch (error) {
        console.error('Error adding user:', error);
    }
}

async function verifyUser(username) {
    officialToken = TokenModule.generateToken();
    hashedToken = Encryptor.encrypt(officialToken);
    verified = true;

    try {
        await DBUtils.addToken(hashedToken ,username, verified);
        return officialToken;
    }
    catch (error) {
        console.error('Error verifying user:', error);
    }
}

module.exports = {
    checkValidToken,
    getUserInfo,
    getUserVerificationStatus,
    registerUser,
    tokenExits,
    verifyUser,
};