const express = require('express');
const validatorToken = require('../middleware/auth-token');
const router = express.Router();

router.get('/', validatorToken.njwtAuth);

module.exports = router; 