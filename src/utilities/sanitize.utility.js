
const { check} = require('express-validator');

/*
 * Sanitize the key query parameter middleware
 */
exports.sanitizeKey = [
    check('key').exists().withMessage('Missing required parameter: key').trim().escape(),
];


/*
 * Sanitize the website_page query parameter middleware
 */
exports.sanitizeWebsitePage = [
    check('page').exists().withMessage('Missing required parameter: page').trim().escape(),
];

/*
 * Sanitize the ip query parameter middleware
 */
exports.sanitizeIp = [
    check('IP').optional().isIP(4).withMessage('Invalid parameter: IP').trim().escape(),
];


/*
 * Sanitize the referer query parameter middleware
 */
exports.sanitizeReferer = [
    check('referer').optional().isURL().withMessage('Invalid parameter: referer').trim().escape(),
];