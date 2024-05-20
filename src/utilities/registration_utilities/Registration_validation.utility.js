const { check, validationResult } = require('express-validator');

const validateRegistrationParameters = (req, res, next) => {
    const requiredParameters = ['username', 'page', 'email'];
    const requestParameters = Object.keys(req.query);

    for (let i = 0; i < requestParameters.length; i++) {
        if (!requiredParameters.includes(requestParameters[i])) {
            return res.status(400).json({ error: `RV201 - Invalid parameter: ${requestParameters[i]}` });
        }
    }

    for (let i = 0; i < requiredParameters.length; i++) {
        if (!requestParameters.includes(requiredParameters[i])) {
            return res.status(400).json({ error: `RV202 - Missing required parameter: ${requiredParameters[i]}` });
        }
    }

    next();
};

const validateRegistrationEmail = [
    check('email').isEmail().withMessage('RV203 - Invalid parameter: email'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

exports.validateRegistration = [
    validateRegistrationParameters,
    ...validateRegistrationEmail,
];