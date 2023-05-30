const express = require('express');
const router = express.Router();
const controller = require('../controllers/device');   

router.post('/send', controller.postSendDevice);
router.get('/receive', controller.getFromDevice);
module.exports = router;