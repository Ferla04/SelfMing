const { check, validationResult } = require('express-validator');


validatorParams = [
    check('correo').isString(),
    check('password').isLength({min: 2, max: 20})
];

function validator(req, res, next) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    next();
};

module.exports = {
  validatorParams,
  validator,

}
