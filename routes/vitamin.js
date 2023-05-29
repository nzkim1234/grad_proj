const express = require('express');
const router = express.Router();
const controller = require('../controllers/vitamin');   

router.post('/add', controller.postAddVitamin);
router.get('/get', controller.getVitamin); 
router.get('/remove', controller.getRemoveVitamin); 
module.exports = router;