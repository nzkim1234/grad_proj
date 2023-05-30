const express = require('express');
const router = express.Router();
const controller = require('../controllers/device');   

router.post('/get', controller.getActiveDevice);
module.exports = router;