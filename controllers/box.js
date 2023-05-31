const db = require('../config/config');

module.exports = {
    postBox : async (req, res, next) => {
        const [boxnum, vseq, seq] = [req.body.boxnum, req.body.vseq, req.body.seq];
        db.query(`UPDATE ${seq}_boxs SET contain_vitamin = ${vseq} WHERE (boxnum = ${boxnum})`, (err, row) => {
            if (err){
                return res.send(400).end();
            }
            else{
                return res.send(200).end();
            }
        });
    },
    getBox : async(req, res, next) => {
        db.query(`SELECT * FROM ${req.query.seq}_boxs`, (err, row) => {
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