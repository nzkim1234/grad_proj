const express = require('express');
const router = express.Router();
const controller = require('../controllers/register')

router.post('/', controller.postRegisterForm);
router.post('/changeinfo', controller.postChangeInfo);
module.exports = router;