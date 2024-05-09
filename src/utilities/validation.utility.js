const { check, validationResult } = require('express-validator');

/*
 * Validate the key query parameter middleware
 */
exports.validateKey = [
    check('key').isLength({ min: 30, max: 30 }).withMessage('Invalid key - length error'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];

/*
 * Validate the website_page query parameter middleware
 */
exports.validateWebsitePage = [
    check('website_page').isURL().withMessage('Invalid website_page - URL error'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];
