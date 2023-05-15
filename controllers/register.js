const db = require('../config/config');
const bcrypt = require('bcrypt');

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
                                    db.query(`CREATE TABLE ${seq_db} (prod_name VARCHAR(45) NOT NULL, intake_per_day INT(10) UNSIGNED ZEROFILL DEFAULT NULL, vitaminA INT(10) UNSIGNED ZEROFILL DEFAULT NULL, vitaminD INT(10) UNSIGNED ZEROFILL DEFAULT NULL, vitaminE INT(10) UNSIGNED ZEROFILL DEFAULT NULL, vitaminK INT(10) UNSIGNED ZEROFILL DEFAULT NULL, vitaminB1 INT(10) UNSIGNED ZEROFILL DEFAULT NULL, vitaminB2 INT(10) UNSIGNED ZEROFILL DEFAULT NULL, vitaminB6 INT(10) UNSIGNED ZEROFILL DEFAULT NULL, vitaminB12 INT(10) UNSIGNED ZEROFILL DEFAULT NULL, vitaminC INT(10) UNSIGNED ZEROFILL DEFAULT NULL, nicotinic_acid INT(10) UNSIGNED ZEROFILL DEFAULT NULL, pantothenic INT(10) UNSIGNED ZEROFILL DEFAULT NULL, folic_acid INT(10) UNSIGNED ZEROFILL DEFAULT NULL, biotin INT(10) UNSIGNED ZEROFILL DEFAULT NULL, calcium INT(10) UNSIGNED ZEROFILL DEFAULT NULL, magnesium INT(10) UNSIGNED ZEROFILL DEFAULT NULL,iron INT(10) UNSIGNED ZEROFILL DEFAULT NULL, copper INT(10) UNSIGNED ZEROFILL DEFAULT NULL, selenium INT(10) UNSIGNED ZEROFILL DEFAULT NULL, iodine INT(10) UNSIGNED ZEROFILL DEFAULT NULL, manganese INT(10) UNSIGNED ZEROFILL DEFAULT NULL, molybdenum INT(10) UNSIGNED ZEROFILL DEFAULT NULL, chrome INT(10) UNSIGNED ZEROFILL DEFAULT NULL, UNIQUE KEY prod_name_UNIQUE (prod_name))`, (err, row) =>{
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
}