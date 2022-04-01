const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');

router.get('/', homeController.home);
// router.post('/upload', Upload.single('CSV_File'), homeController.upload);
router.post('/upload', homeController.upload);

router.use('/showFile', require('./showFile'));

module.exports = router;