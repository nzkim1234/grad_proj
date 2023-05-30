const express = require('express');
const router = express.Router();
const controller = require('../controllers/device');   

router.post('/send', controller.postSendDevice);
module.exports = router;