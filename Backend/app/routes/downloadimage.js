const express = require('express');
const imagenesController = require('../controllers/imagenes-controller');
const router = express.Router();


router.get('/', imagenesController.imagen);


module.exports = router;