const express = require('express');
const actualizarestadoController = require('../controllers/actualizarestado-controller');
const router = express.Router();


router.put('/', actualizarestadoController.actualizarestado);


module.exports = router; 