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
      cb(null, path.basename(file.originalname, ext) + "_" + 'image' + ext);
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
                                    const seq_user_db = seq + '_data';
                                    const seq_alarm_db = seq + '_alarm';
                                    const seq_box_db = seq + '_boxs';
                                    db.query(`CREATE TABLE ${seq_user_db} (
                                        vseq int NOT NULL AUTO_INCREMENT,
                                        prod_name varchar(45) NOT NULL,
                                        intake_per_day int unsigned DEFAULT 0,
                                        taken int unsigned DEFAULT 0,
                                        vitaminA int unsigned DEFAULT 0,
                                        vitaminD int unsigned DEFAULT 0,
                                        vitaminE int unsigned DEFAULT 0,
                                        vitaminK int unsigned DEFAULT 0,
                                        vitaminB1 int unsigned DEFAULT 0,
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
                                        PRIMARY KEY (vseq,prod_name),
                                        UNIQUE KEY prod_name_UNIQUE (prod_name),
                                        UNIQUE KEY vseq_UNIQUE (vseq)
                                      )`, (err, row) =>{
                                            if(err) {
                                                console.log(err);
                                                return res.status(400).end();
                                            }
                                            else{
                                                db.query(`CREATE TABLE ${seq_alarm_db} (
                                                    alarm_name varchar(45) NOT NULL, 
                                                    alarm_time varchar(45) NOT NULL, 
                                                    days varchar(45) NOT NULL,  
                                                    box varchar(45) NOT NULL, 
                                                    PRIMARY KEY (alarm_name), 
                                                    UNIQUE KEY alarm_num_UNIQUE (alarm_name)
                                                  )`, (err, row) => {
                                                        if(err) {
                                                            console.log(err);
                                                            return res.status(400).end();
                                                        }
                                                        else {
                                                            db.query(`CREATE TABLE ${seq_box_db} (
                                                                boxnum int NOT NULL,
                                                                contain_vitamin int NOT NULL DEFAULT 0,
                                                                PRIMARY KEY (boxnum),
                                                                UNIQUE KEY boxnum_UNIQUE (boxnum)
                                                              )`, (err, row) => {
                                                                if(err) {
                                                                    console.log(err);
                                                                    return res.status(400).end();
                                                                }
                                                                else {
                                                                    db.query(`INSERT INTO ${seq_box_db} (boxnum) VALUES (1)`);
                                                                    db.query(`INSERT INTO ${seq_box_db} (boxnum) VALUES (2)`);
                                                                    db.query(`INSERT INTO ${seq_box_db} (boxnum) VALUES (3)`);
                                                                    db.query(`INSERT INTO ${seq_box_db} (boxnum) VALUES (4)`);
                                                                    db.query(`INSERT INTO ${seq_box_db} (boxnum) VALUES (5)`);
                                                                    db.query(`INSERT INTO ${seq_box_db} (boxnum) VALUES (6)`);
                                                                    return res.status(200).end();
                                                                }
                                                            });
                                                        }
                                                });
                                            }
                                    });
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    postChangeInfo: async(req, res, next) => {
        const uploadImage = upload.single("image");
        uploadImage(req, res, (err) => {
            const [userSeq, userName, userBirth, userGender] = [req.body.seq, req.body.name, req.body.birth, req.body.gender];
            if (err) {
              console.log(err);
              return res.status(500).send("Error occurred while uploading image or missing data");
            }
            else {
                db.query('update users SET name = ?, birth = ?, gender = ?, default_img = ? where (seq = ?)', [userName, userBirth, userGender, req.file.filename , userSeq], (err, row) => {
                    if(err) {
                        console.log(err);
                        return res.status(400).end();
                    }
                    else {
                        return res.status(200).end();
                    }
                });
            }
          });
    },
}