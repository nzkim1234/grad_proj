const db = require('../config/config');
const bcrypt = require('bcrypt');

module.exports = {
    loginForm: async (req, res, next) => {
        console.log(req.body)
        db.query('SELECT * FROM users WHERE id=?', req.body.id, (err, row) => {
            if(err) {
                console.log(err)
                return res.status(400).send(err);
            }

            if(row.length > 0){
                sendInfo = {
                    'seq' : row[0].seq,
                    'id' : row[0].id,
                    'name' : row[0].name,
                    'gender' : row[0].gender,
                    'birth' : row[0].birth,
                    'serial_id': row[0].serial_id
                }
                bcrypt.compare(req.body.pw, row[0].pw, (err, result) => {
                    console.log(result)
                    if(result) {
                        return res.status(200).send(sendInfo);
                    }
                    else return res.status(400).send('wrong pw');
                })
            }
            else {
                console.log('no ID');
                return res.status(400).send('no ID');
            }
        })
    },
}