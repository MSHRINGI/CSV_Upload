const express = require('express');
const router = express.Router();
const Upload = require('../models/multer');

const homeController = require('../controllers/home_controller');

router.get('/', homeController.home);
router.post('/upload', Upload.single('CSV_File'), homeController.upload);

module.exports = router;