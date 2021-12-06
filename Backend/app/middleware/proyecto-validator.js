const { check, validationResult } = require('express-validator');


validatorParams = [
    check('nombre').isString(),
    check('prog').isInt(),
    check('user').isInt(),
    check('fecha').isDate(),
    check('descripcion').isString(),
    check('archivo').isString(),
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
