const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

/* 
    * Generate a key
    * @returns {string} key
*/
function generateKey() {
    let key = 'webmailer_';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 20; i++) {
        key += characters.charAt(Math.floor(Math.random() * characters.length));
    }
gi
    return key;
}


/* 
    * Check if the key is valid
    * @param {string} key
    * @returns {boolean} true if the key is valid, otherwise return false
*/
function checkValidKey(key) {
    if (key === undefined || key === null) {
        return false;
    }

    if (key.length !== 30) {
        return false;
    }

    try {
        data = fs.readFileSync(path.join(__dirname, '../assets/keypairs.json'), 'utf8');
    } catch (err) {
        console.error('Error reading file:', err);
        return false;
    }

    const keyPairs = JSON.parse(data);

    const hashedKey = crypto.createHash('sha256').update(key).digest('hex');

    for (let keyPair of keyPairs) {
        if (keyPair.key === hashedKey) {
            return true;
        }
    }

    return false;
}

/* 
    * Get the key info
    * @param {string} key
    * @returns {object} key info
*/
function getKeyInfo(key) {

    const hashedKey = crypto.createHash('sha256').update(key).digest('hex');

    try {
        data = fs.readFileSync(path.join(__dirname, '../assets/keypairs.json'), 'utf8');
    } catch (err) {
        console.error('Error reading file:', err);
        return false;
    }

    const keyPairs = JSON.parse(data);

    for (let keyPair of keyPairs) {
        if (keyPair.key === hashedKey) {
            return keyPair.key_info;
        }
    }

    return null;
}

exports.generateKey = generateKey;
exports.checkValidKey = checkValidKey;
exports.getKeyInfo = getKeyInfo;