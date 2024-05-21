const { check } = require('express-validator');
/*
 * Sanitize the username query parameter middleware
 */
const sanitizeUsername = [
    check('username').exists().withMessage('VS101 - Missing required parameter: username').trim().escape(),
];


/*
 * Sanitize the token query parameter middleware
 */
const sanitizeToken = [
    check('token').exists().withMessage('VS102 - Missing required parameter: token').trim().escape(),
];


exports.sanitizeVerify = [
    ...sanitizeUsername,
    ...sanitizeToken,
];