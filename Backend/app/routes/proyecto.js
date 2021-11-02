const express = require('express');
const proyectoController = require('../controllers/proyecto-controller');
const validatorProyecto = require('../middleware/proyecto-validator');
const router = express.Router();


router.post('/', validatorProyecto.validatorParams, validatorProyecto.validator, proyectoController.proyecto);


module.exports = router; 