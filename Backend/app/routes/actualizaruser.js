const express = require('express');
const actualizaruserController = require('../controllers/actualizaruser-controller');
const router = express.Router();


router.put('/', actualizaruserController.actualizarUser);


module.exports = router; 