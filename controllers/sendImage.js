const multer = require('multer')
const path = require("path");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/vImages/");
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + "_" + req.body.prodname + '_image' + ext);
    },
  });
  
const upload = multer({ storage: storage });
  

module.exports = {
    postImage : async (req, res, next) => {
        const uploadImage = upload.single("image");
        uploadImage(req, res, (err) => {
            if (err) {
              console.log(err);
              return res.status(500).send("Error occurred while uploading image or missing data");
            }
            else {
                console.log('uploaded!');
                return res.send(200).end();
            }
          });
    },
}