const express = require('express');
const router = express.Router();
const controller = require('../controllers/alarm');   

router.post('/add', controller.postAddAlarm);
router.get('/get', controller.getAlarm); 
router.post('/remove', controller.postRemoveAlarm); 
router.post('/edit', controller.postEditAlarm); 
module.exports = router;