const { check } = require('express-validator');
/*
 * Sanitize the username query parameter middleware
 */
const sanitizeUsername = [
    check('username').exists().withMessage('RS101 - Missing required parameter: username').trim().escape(),
];


/*
 * Sanitize the email query parameter middleware
 */
const sanitizeEmail = [
    check('email').exists().withMessage('RS1021 - Missing required parameter: email').isEmail().withMessage('RS1022 - Invalid parameter: email').trim(),
];

/*
 * Sanitize the page parameter middleware
 */
const sanitizePage = [
    check('page').exists().withMessage('RS103 - Missing required parameter: page').isString().withMessage('RS1031 - Invalid parameter: page').trim().escape(),
];

exports.sanitizeRegistration = [
    ...sanitizeUsername,
    ...sanitizeEmail,
    ...sanitizePage,
];