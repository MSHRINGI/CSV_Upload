const express = require('express');
const router = express.Router();

const filesController = require('../controllers/files_controller');

// URL :- http://localhost:8888/showFile/:id
router.get('/:id', filesController.showFile);

module.exports = router;