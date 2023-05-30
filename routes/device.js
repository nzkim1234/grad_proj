const express = require('express');
const router = express.Router();
const controller = require('../controllers/device');   

router.get('/send', controller.postSendDevice);
module.exports = router;