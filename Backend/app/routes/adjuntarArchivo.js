const express = require('express');
const archivosController = require('../controllers/archivos-controller');
const router = express.Router();


router.post('/', archivosController.uploadfile);


module.exports = router;