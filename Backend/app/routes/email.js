const express = require('express');
const emailController = require('../controllers/email-controller');
const router = express.Router();


router.get('/', emailController.confirmEmail);


module.exports = router; 