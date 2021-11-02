const express = require('express');
const pagosController = require('../controllers/pagos-controller');
const validatorPagos = require('../middleware/pagos-validator');
const router = express.Router();


router.post('/', validatorPagos.validatorParams, validatorPagos.validator, pagosController.pagos);


module.exports = router; 