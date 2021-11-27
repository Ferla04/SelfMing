const express = require('express');
const actualizaradminController = require('../controllers/actualizaradmin-controller');
const router = express.Router();


router.put('/', actualizaradminController.actualizaradmin);


module.exports = router; 