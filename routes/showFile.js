const express = require('express');
const router = express.Router();

const filesController = require('../controllers/files_controller');

router.get('/:id', filesController.showFile);

module.exports = router;