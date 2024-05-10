const crypto = require('crypto');


/**
 * Encrypt the token
 * @param {string} token
 * @returns {string} hashedToken
 */
function encrypt(token) {
    
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    return hashedToken;
}


exports.encrypt = encrypt;