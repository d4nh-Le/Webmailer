const validateVerifyParameters = (req, res, next) => {
    const requiredParameters = ['username', 'token'];
    const requestParameters = Object.keys(req.query);

    for (let i = 0; i < requestParameters.length; i++) {
        if (!requiredParameters.includes(requestParameters[i])) {
            return res.status(400).json({ error: `VV201 - Invalid parameter: ${requestParameters[i]}` });
        }
    }

    for (let i = 0; i < requiredParameters.length; i++) {
        if (!requestParameters.includes(requiredParameters[i])) {
            return res.status(400).json({ error: `VV202 - Missing required parameter: ${requiredParameters[i]}` });
        }
    }

    next();
};

exports.validateVerify = [
    validateVerifyParameters,
];