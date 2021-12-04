const express = require('express');
const traerportaController = require('../controllers/traerporta-controller');
const router = express.Router();

router.get('/', traerportaController.traerporta);

module.exports = router; 
