const express = require('express');
const portafolioController = require('../controllers/portafolio-controller')
const router = express.Router();


router.post('/', portafolioController.nuevoportafolio);

module.exports = router;  