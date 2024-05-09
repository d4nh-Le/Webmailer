
const { check} = require('express-validator');

exports.sanitizeKey = check('key').trim().escape();

exports.sanitizeWebsitePage = check('website_page').trim().escape();