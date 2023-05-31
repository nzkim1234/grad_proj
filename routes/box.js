const express = require('express');
const router = express.Router();
const controller = require('../controllers/box');   

router.post('/postbox', controller.postBox);
router.get('/getbox', controller.getBox);

module.exports = router;