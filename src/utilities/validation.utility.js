const fs = require('fs');
const path = require('path');

function validateKey(key) {
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

    return keyPairs.some(keyPair => keyPair.key === key);
}

exports.validateKey = validateKey;
