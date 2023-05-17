const express = require('express');
const router = express.Router();
const controller = require('../controllers/showProfile')

router.get('/', controller.getProfileImage);

module.exports = router;