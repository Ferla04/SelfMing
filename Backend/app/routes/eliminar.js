const express = require('express');
const eliminarController = require('../controllers/eliminar-controller');
const router = express.Router();


router.delete('/', eliminarController.eliminar);


module.exports = router; 