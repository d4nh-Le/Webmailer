
const { check} = require('express-validator');

/*
 * Sanitize the key query parameter middleware
 */
exports.sanitizeKey = check('key').trim().escape();


/*
 * Sanitize the website_page query parameter middleware
 */
exports.sanitizeWebsitePage = check('website_page').trim().escape();