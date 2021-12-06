const express = require('express');
const selectproyectoController = require('../controllers/selectproyecto-controller');
const router = express.Router();

router.get('/', selectproyectoController.selectproyecto);

module.exports = router; 