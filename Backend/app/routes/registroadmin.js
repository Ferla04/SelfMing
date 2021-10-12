const express = require('express');
const registroadminController = require('../controllers/registroadmin-controller');
const validatorRegistroadmin = require('../middleware/registroadmin-validator');
const router = express.Router();


router.post('/', validatorRegistroadmin.validatorParams, validatorRegistroadmin.validator, registroadminController.registroadmin);

module.exports = router; 