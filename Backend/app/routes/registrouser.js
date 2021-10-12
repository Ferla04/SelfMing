const express = require('express');
const registrouserController = require('../controllers/registrouser-controller');
const validatorRegistrouser = require('../middleware/registrouser-validator');
const router = express.Router();


router.post('/', validatorRegistrouser.validatorParams, validatorRegistrouser.validator, registrouserController.registrouser);

module.exports = router;  