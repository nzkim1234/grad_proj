const express = require('express');
const router = express.Router();
const controller = require('../controllers/vitamin');   

router.get('/search',controller.getSearchVitamin);
router.post('/add', controller.postAddVitamin);
router.get('/get', controller.getVitamin); 
router.post('/remove', controller.postRemoveVitamin); 
module.exports = router;