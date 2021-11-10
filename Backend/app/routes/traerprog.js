const express = require('express');
const traerprogController = require('../controllers/traerprog-controller');
const router = express.Router();

router.get('/', traerprogController.traerAdmin);

module.exports = router; 
