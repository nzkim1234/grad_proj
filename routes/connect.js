const express = require('express');
const router = express.Router();
const controller = require('../controllers/connect');   

router.get('/', controller.getConnection);

module.exports = router;