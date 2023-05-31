const db = require('../config/config');

module.exports = {
    postBox : async (req, res, next) => {
        const [boxnum, vseq] = [req.body.boxnum, req.body.vseq];
        db.query(`UPDATE boxs SET contain_vitamin = ${vseq} WHERE (boxnum = ${boxnum})`, (err, row) => {
            if (err){
                return res.send(400).end();
            }
            else{
                return res.send(200).end();
            }
        });
    },
    getBox : async(req, res, next) => {
        db.query(`SELECT * FROM boxs`, (err, row) => {
            if (err){
                console.log(err);
                return res.send(400);
            }

            if (row) {
                console.log(row);
                return res.send(row).end();
            }
        });
    }
}