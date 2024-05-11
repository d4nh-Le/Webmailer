
const { check} = require('express-validator');

/*
 * Sanitize the key query parameter middleware
 */
const sanitizeKey = [
    check('key').exists().withMessage('Missing required parameter: key').trim().escape(),
];


/*
 * Sanitize the website_page query parameter middleware
 */
const sanitizePage = [
    check('page').exists().withMessage('Missing required parameter: page').trim().escape(),
];

/*
 * Sanitize the ip query parameter middleware
 */
const sanitizeIp = [
    check('IP').isIP(4).withMessage('Invalid parameter: IP').optional().trim().escape(),
];


/*
 * Sanitize the referer query parameter middleware
 */
const sanitizeReferer = [
    check('referer').isURL().withMessage('Invalid parameter: referer').optional().customSanitizer(value => {
      const url = new URL(value);
      return url.hostname;
    }),
];

exports.sanitizeQuery = [
    ...sanitizeKey,
    ...sanitizePage,
    ...sanitizeIp,
    ...sanitizeReferer,
  ];