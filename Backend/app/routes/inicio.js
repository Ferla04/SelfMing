const express = require('express');
const inicioController = require('../controllers/inicio-controller');
const router = express.Router();


router.get('/', inicioController.bringAdmin );


module.exports = router; 