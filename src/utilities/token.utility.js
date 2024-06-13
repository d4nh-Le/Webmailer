
/* 
    * Generate a key
    * @returns {string} key
*/
function generateToken() {
    let key = 'webmailer_';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 20; i++) {
        key += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return key;
}

module.exports = {
    generateToken,
};