const { check, validationResult } = require('express-validator');


validatorParams = [
    check('nombre').isString(),
    check('correo').isEmail(),
    check('celular').isInt(),
    check('password').isLength({min: 2, max: 20}),
    check('portafolio').isString(),
    check('rango').isString(),
    check('especialidad').isString(),
    check('descripcion').isString()
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