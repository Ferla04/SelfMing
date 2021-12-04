const express = require('express');
const imagenportafolioController = require('../controllers/imagenportafolio-controller');
const router = express.Router();


router.post('/', imagenportafolioController.uploadImgPortafolio);

module.exports = router;  