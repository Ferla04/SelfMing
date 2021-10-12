const express = require('express');
const pagosController = require('../controllers/pagos-controller');
const validatorPagos = require('../middleware/pagos-validator');
const validatorToken = require('../middleware/auth-token');
const router = express.Router();


router.post('/', validatorToken.njwtAuth,validatorPagos.validatorParams, validatorPagos.validator, pagosController.pagos);


module.exports = router; 