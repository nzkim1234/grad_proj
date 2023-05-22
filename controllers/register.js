const db = require('../config/config');
const bcrypt = require('bcrypt');
const multer = require('multer')
const path = require("path");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/images/");
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + "-" + Date.now() + ext);
    },
  });
  
const upload = multer({ storage: storage });
  
  
module.exports = {
    postRegisterForm: async (req, res, next) => {
        const [userId, userPw, userName, userBirth, userGender, user_SerialId] = [req.body.id, req.body.pw, req.body.name, req.body.birth, req.body.gender, req.body.serialid];
        const hashedPw = bcrypt.hashSync(userPw, 10);
        db.query('SELECT * FROM users WHERE id=?', userId, (err, row) => {
            if (row.length > 0) {
                console.log(row);
                console.log('same id exists')
                return res.status(400).end();
            }
            else {
                db.query('SELECT * FROM users WHERE serial_id=?', user_SerialId, (err, row) => {
                    if (row.length > 0) {
                        console.log(row);
                        return res.status(400).end();
                    }
                    else {
                        db.query('INSERT INTO users(`id`, `pw`, `name`, `birth`, `gender`, `serial_id`) VALUES(?, ?, ?, ?, ?, ?)', [userId, hashedPw, userName, userBirth, userGender, user_SerialId], (err, row) => {
                            if(err) {
                                console.log(err) ;
                                return res.status(400).end();
                            }
                            else {
                                db.query('SELECT seq FROM users WHERE id=?', userId, (err, row) => {
                                    const seq = row[0].seq;
                                    const seq_db = seq + '_data'
                                    db.query(`CREATE TABLE ${seq_db} (
                                        prod_name varchar(45) NOT NULL,
                                        intake_per_day int unsigned DEFAULT 0,
                                        vitaminA int unsigned DEFAULT 0,
                                        vitaminD int unsigned DEFAULT 0,
                                        vitaminE int unsigned DEFAULT 0,
                                        viatminK int unsigned DEFAULT 0,
                                        viatminB1 int unsigned DEFAULT 0,
                                        vitaminB2 int unsigned DEFAULT 0,
                                        vitaminB6 int unsigned DEFAULT 0,
                                        vitaminB12 int unsigned DEFAULT 0,
                                        vitaminC int unsigned DEFAULT 0,
                                        nicotinic_acid int unsigned DEFAULT 0,
                                        pantothenic int unsigned DEFAULT 0,
                                        folic_acid int unsigned DEFAULT 0,
                                        biotin int unsigned DEFAULT 0,
                                        calcium int unsigned DEFAULT 0,
                                        magnesium int unsigned DEFAULT 0,
                                        iron int unsigned DEFAULT 0,
                                        copper int unsigned DEFAULT 0,
                                        selenium int unsigned DEFAULT 0,
                                        iodine int unsigned DEFAULT 0,
                                        manganese int unsigned DEFAULT 0,
                                        molybdenum int unsigned DEFAULT 0,
                                        chrome int unsigned DEFAULT 0,
                                        UNIQUE KEY prod_name_UNIQUE (prod_name)
                                      )`, (err, row) =>{
                                            if(err) {
                                                console.log(err);
                                                return res.status(400).end();
                                            }
                                            else{
                                                console.log("db_made")
                                                return res.status(200).end();
                                            }
                                    })
                                })
                            }
                        })
                                
                    }
                })
            }
        })
    },
    postChangeInfo: async(req, res, next) => {
        const [userSeq, userName, userBirth, userGender, userProfileImgName] = [req.body.seq, req.body.name, req.body.birth, req.body.gender, req.body.profileImgName];
        console.log(userSeq, userName, userBirth, userGender, userProfileImgName);
        db.query('update users SET name = ?, birth = ?, gender = ?, default_img = ? where (seq = ?)', [userName, userBirth, userGender, userProfileImgName, userSeq], (err, row) => {
            if(err) {
                console.log(err);
                return res.status(400).end();
            }
            else {
                return res.status(200).end();
            }
        })
    },
    postChangePorfileImg: async(req, res, next) => {
        console.log(req.file);
        upload.single("1234");
    }
}