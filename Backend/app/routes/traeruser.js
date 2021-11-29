const express = require('express');
const traeruserController = require('../controllers/traeruser-controller');
const router = express.Router();

router.get('/', traeruserController.traerUser);

module.exports = router; 
