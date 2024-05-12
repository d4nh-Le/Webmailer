const { check, validationResult } = require('express-validator');


/*
 * Validate the key query parameter middleware
 */
const validateRequestParameters = (req, res, next) => {
    const requiredParameters = ['key', 'page'];
    const optionalParameters = ['ip', 'referer'];
    const allowedParameters = [...requiredParameters, ...optionalParameters];
    const requestParameters = Object.keys(req.query);

    for (let i = 0; i < requestParameters.length; i++) {
        if (!allowedParameters.includes(requestParameters[i])) {
            return res.status(400).json({ error: `V201 - Invalid parameter: ${requestParameters[i]}` });
        }
    }

    for (let i = 0; i < requiredParameters.length; i++) {
        if (!requestParameters.includes(requiredParameters[i])) {
            return res.status(400).json({ error: `V202 - Missing required parameter: ${requiredParameters[i]}` });
        }
    }

    next();
};

/*
 * Validate the key query parameter middleware
 */
const validateKey = [
    check('key').isLength({ min: 30, max: 30 }).withMessage('V203 - Invalid parameter: key - length error'),
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
const validateWebsitePage = [
    check('page').isString().withMessage('V204 - Invalid page - format error'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];

exports.ValidateQuery = [
    ...validateKey,
    ...validateWebsitePage,
    validateRequestParameters
  ];

exports.validateKey = validateKey;
exports.validateWebsitePage = validateWebsitePage;
exports.validateRequestParameters = validateRequestParameters;
