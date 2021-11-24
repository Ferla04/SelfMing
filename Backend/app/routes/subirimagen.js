const express = require('express');
const subirimagenController = require('../controllers/subirimagen-controller');
const router = express.Router();


router.post('/', subirimagenController.upload);

module.exports = router;  