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
                            else return res.status(200).end();
                        })
                    }
                })
            }
        })
    },
}