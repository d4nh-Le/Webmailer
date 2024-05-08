const { check } = require('express-validator');

exports.validateKey = check('key')
    .isLength({ min: 30, max: 30 }) 
    .withMessage('Key must be between 5 and 30 characters long');

exports.validateWebsitePage = check('website_page')
    .isURL() 
    .withMessage('Website page must be a valid URL');
