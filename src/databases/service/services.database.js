const DBUtils = require('../utility/utilities.database');
const Encryptor = require('../../utilities/encryption.utility');


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
}

let test1 = '';

getUserInfo('webmailer_i6psHKXCPalipw0R5Ijg').then((data) => {
    test1 = data;
});

console.log(test1);
 

module.exports = {
    checkValidToken,
    getUserInfo
};