const express = require('express');
const router = express.Router();
const controller = require('../controllers/register')
const multer = require("multer");
const path = require("path");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    console.log(ext);
    cb(null, path.basename(file.originalname, ext) + "_" + 'image' + ext);
  },
});

var upload = multer({ storage: storage });


router.post('/', controller.postRegisterForm);
router.post('/changeinfo', controller.postChangeInfo);
  
module.exports = router;