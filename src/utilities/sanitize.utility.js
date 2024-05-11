
const { check} = require('express-validator');

/*
 * Sanitize the key query parameter middleware
 */
const sanitizeKey = [
    check('key').exists().withMessage('S101 - Missing required parameter: key').trim().escape(),
];


/*
 * Sanitize the website_page query parameter middleware
 */
const sanitizePage = [
    check('page').exists().withMessage('S1021 - Missing required parameter: page').isLength({ max: 70 }).withMessage('S1022 - Invalid parameter: page - must be less than 70 characters').trim().escape(),
];

/*
 * Sanitize the ip query parameter middleware
 */
const sanitizeIp = [
    check('IP').isIP(4).withMessage('S103 - Invalid parameter: IP').optional().trim().escape(),
];


/*
 * Sanitize the referer query parameter middleware and extract the domain
 */
const sanitizeReferer = [
    check('referer').optional().isURL().withMessage('S104 - Invalid parameter: referer').customSanitizer(value => {
        try {
            let domain = value.indexOf("://") > -1 ? value.split('/')[2] : value.split('/')[0];
            domain = domain.split(':')[0];
            return domain;

          } catch (err) {
            throw new Error('S1041 - Invalid parameter: referer');
          }
        }),
  ];

exports.sanitizeQuery = [
    ...sanitizeKey,
    ...sanitizePage,
    ...sanitizeIp,
    ...sanitizeReferer,
  ];

  exports.sanitizeKey = sanitizeKey;
  exports.sanitizePage = sanitizePage;
  exports.sanitizeIp = sanitizeIp;
  exports.sanitizeReferer = sanitizeReferer;