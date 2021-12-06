const express = require('express');
const traerproyectoController = require('../controllers/traerproyecto-controller');
const router = express.Router();

router.get('/', traerproyectoController.traerproyecto);

module.exports = router; 