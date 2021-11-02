const express = require('express');
const proyectoController = require('../controllers/proyecto-controller');
const validatorProyecto = require('../middleware/proyecto-validator');
const validatorToken = require('../middleware/auth-token');
const router = express.Router();


router.get('/', validatorToken.njwtAuth,validatorProyecto.validatorParams, validatorProyecto.validator, proyectoController.proyecto);


module.exports = router; 