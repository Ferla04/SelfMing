const { check, validationResult } = require('express-validator');


validatorParams = [
    check('nomproyecto').isString(),
    check('fecentrega').isDate(),
    check('descripcion').isString(),
    check('estado').isString(),
    check('usuario').isString(),
    check('programador').isString(),
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
